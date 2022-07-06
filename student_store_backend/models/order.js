const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const db = require("../db");
const User = require("../models/user");


class Order {

    static async listOrdersForUser(email){
        //Lists all the orders for a user
        const results = await db.query(
            `
            SELECT orders.orderId AS "orderId", orders.customer_id AS "customerId", order_details.quantity AS "quantity", products.name AS "name", products.price AS "price"
            FROM users
                JOIN order_details ON orders.id = order_details.order_id
                JOIN products ON products.id = order_details.products_id    
            ` , [email]
        );

        return results.rows;
    }

    static async createOrder(user, order){
        //Use arguments to make a order and add it to the database.
        const requiredField = ["customer_id"];
        requiredField.forEach((element) => {
            if(!user.hasOwnProperty(element)){
                throw new BadRequestError(`Missing ${element} in request body`);
            }
        });

        const results = await db.query(
        `
        INSERT INTO orders ()
        VALUES($1, (SELECT id FROM users WHERE email = $2), $3)
        RETURNING id AS "orderId", 
                  customer_id,
                  created_at 
        `, [user.email]
        );
        
        const orderId = results.rows[0].orderId;

        order.forEach(e => {
            async () => await db.query(
                `
                INSERT INTO order_details ()
                VALUES ($1, $2, $3, $4)
                RETURNING order_id,
                          product_id, 
                          quantity,
                          discount
                `, [orderId, e.product_id, e.quantity]
            );
            
        })

    }
}

module.exports = Order;
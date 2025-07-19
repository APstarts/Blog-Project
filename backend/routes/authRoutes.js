import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from "../database/db.js";
import { SECRET_KEY } from "../configs/env.config.js";


const authRoute = Router();


//Signing in existing user
authRoute.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const result = await db.query("SELECT * FROM USERS WHERE email = $1", [email]);
    const user = result.rows[0];

    try {
        if(!user){
            return res.status(409).json({message: "User not found. Please login from the login page."});
        };
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(409).json({message: "Incorrect password. Please try again."});
        };
        const payload = {
                id: user.id,
                user: user.email
        };
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
        return res.status(200).json({sucess: true, message: `Login successful!`, token, user: {id: user.id, username: user.email}});
        
    } catch (error) {
        console.log(`Internal server error: ${error}`);
    }
});

//Registering a new user
authRoute.post("/register", async (req, res) => {
    const {email, name, surname, password} = req.body;
    try {
        const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email] );
        const user = result.rows[0];
        if(user){
            //write response with status code here and json message sending information that user already exists.
            return res.status(409).json({message: `user already exists. Please login from the login page!`})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(`INSERT INTO users (email, name, surname, password) VALUES ($1, $2, $3, $4)`, [email, name, surname, hashedPassword]);
        return res.status(200).json({message: "User has been registered!"})
    } catch (error) {
        console.log("Register route error: ", error);
        return res.status(500).json({message: `Internal server error: ${error}`});
    }
    // console.log(email, name, surname, password);
});


export default authRoute;
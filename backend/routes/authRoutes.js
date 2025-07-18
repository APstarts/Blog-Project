import { Router } from "express";
import bcrypt from 'bcrypt';


const authRoute = Router();


//Signing in existing user
authRoute.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const result = await db.query("SELECT * USERS WHERE email = $1", [email]);
    const user = result.rows[0];

    if(!user){
        console.log(`User doesn't exist. Please register or use the correct email.`)
    }
    if(user){
        
        
        //password compare logic here using bcrypt compare
    }
})

//Registering a new user
authRoute.post("/register", async (req, res) => {
    const {email, name, surname, password} = req.body;
    try {
        const result = await db.query(`SELECT * FROM users WHERE email = $1`, [email] );
        const user = result.rows[0];
        if(user){
            console.log(`User already exists. Please login.`)
            return res.status(409).json({message: `user already exists. Please login from the login page!`})
            //write response with status code here and json message sending information that user already exists.
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(`INSERT INTO users (email, name, surname, password) VALUES ($1, $2, $3, $4)`, [email, name, surname, hashedPassword]);
        console.log("User created successfully");
        return res.status(200).json({message: "User has been registered!"})
    } catch (error) {
        console.log("Register route error: ", error);
        return res.status(500).json({message: `Internal server error: ${error}`});
    }
    // console.log(email, name, surname, password);
});


export default authRoute;
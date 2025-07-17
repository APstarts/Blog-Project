import { Router } from "express";

const authRoute = Router();


//Signing in existing user
authRoute.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const result = await db.query("SELECT * USERS WHERE email = $1", email);
    const user = result.rows[0];

    if(!user){
        console.log(`User doesn't exist. Please register or use the correct email.`)
    }
})

//Registering a new user
authRoute.post("/register", async (req, res) => {
    const {email, name, surname, password} = req.body;
    console.log(email, name, surname, password);
});


export default authRoute;
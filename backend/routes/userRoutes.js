import { Router } from "express";
import passport from "passport";
import db from "../database/db.js";

const userRoute = Router();

userRoute.use(passport.authenticate("jwt", {session: false})); //authenticating all the user routes at once.

userRoute.get("/feed", async (req, res) => {
    const userId = req.user.id;
    const result = await db.query("SELECT * FROM posts WHERE author_id = $1", [userId]);
    const contents = result.rows;
    console.log(contents);
    try {
        if(!contents){
            return res.status(409).json({message: `There are no posts from you.`});
        }
        if(contents){
            return res.status(200).json({message: `posts fetched`, contents});
        }
    } catch (error) {
        return res.status(500).json({message: `Internal server error: ${error}`});
    }
});

//self profile page route
userRoute.get("/self_profile", async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await db.query("SELECT users.id AS user_id, users.name, users.surname, posts.title, posts.content, posts.created_at FROM posts INNER JOIN users ON posts.author_id=users.id WHERE users.id=1", [userId]);
        const user = result.rows[0];
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json({message: "User profile fetched", user});
    } catch (error) {
        return res.status(500).json({message: `Internal server error: ${error}`});
    }
});

userRoute.post("/newpost", async (req, res) => {
    const userId = req.user.id;
    const {title, post_Content} = req.body;
    try {
        await db.query("INSERT INTO posts (author_id, title, content) VALUES($1, $2, $3)", [userId, title, post_Content]);
        return res.status(201).json({message: "Posted successfully."});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: `Internal server error: ${error}`});
    }
})

//user verification route
userRoute.get("/verify", async (req, res) => {
    return res.status(200).json({message: "User verified"});
})


export default userRoute;
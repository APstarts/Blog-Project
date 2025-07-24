import { Router } from "express";
import passport from "passport";
import db from "../database/db.js";

const userRoute = Router();

userRoute.use(passport.authenticate("jwt", {session: false})); //authenticating all the user routes at once.


//feed route and logic to get all the posts.
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
        const result = await db.query("SELECT users.id AS user_id, users.name, users.surname, posts.title, posts.content, posts.created_at FROM posts INNER JOIN users ON posts.author_id=users.id WHERE users.id=$1", [userId]);
        const user = result.rows[0];
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json({message: "User profile fetched", user});
    } catch (error) {
        return res.status(500).json({message: `Internal server error: ${error}`});
    }
});

//other users profile page
userRoute.get("/users/:id", async (req, res) => {
    const userId = req.params.id;
    
    try {
        const result = await db.query("SELECT users.id AS user_id, users.name, users.surname, posts.title, posts.content, posts.created_at FROM posts INNER JOIN users ON posts.author_id=users.id WHERE users.id=$1", [userId])
        const profileData = result.rows;
        
        if(!profileData){
            return res.status(409).json({message: `No data found for the selected user`});
        }

        return res.status(200).json({message: `Queried user data fetched.`, profileData});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: `Internal server error: ${error}`});
    }
})

//route and logic for new post
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

//search route
// Full-text search route
userRoute.get("/search", async (req, res) => {
    const { q } = req.query; //because we are using query params, we can access the search query using req.query.q as in frontend we are doing search?q=hello+world


    //validate the search query
    if (!q || q.trim() === "") {
        return res.status(400).json({ message: "Search query is missing." });
    }

    // in case there is a query then we will convert the query to a tsquery format
    // for example, if the query is "hello world" then we will convert it to
    // "hello & world" so that it can be used in the PostgreSQL full-text
    // search query.
    try {
        // Convert input "hello world" → "hello & world"
        const tsQuery = q.trim().split(/\s+/).join(' & ');

        const result = await db.query(`
            SELECT posts.id, posts.title, posts.content, posts.created_at,
                   users.id AS user_id, users.name, users.surname
            FROM posts
            INNER JOIN users ON posts.author_id = users.id
            WHERE posts.search_vector @@ to_tsquery('english', $1)
            ORDER BY posts.created_at DESC
        `, [tsQuery]);

        return res.status(200).json(result.rows);
    } catch (error) {
        console.error("Search error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});


//user verification route
userRoute.get("/verify", async (req, res) => {
    return res.status(200).json({message: "User verified"});
})


export default userRoute;
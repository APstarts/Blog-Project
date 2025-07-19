import { Router } from "express";
import passport from "passport";

const userRoute = Router();

userRoute.use(passport.authenticate("jwt", {session: false}));


export default userRoute;
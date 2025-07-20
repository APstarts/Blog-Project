import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import db from '../database/db.js';
import { SECRET_KEY } from './env.config.js';

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
        // console.log("jwt payload id: ",jwt_payload.id);
        const result = await db.query("SELECT * FROM users WHERE id = $1", [jwt_payload.id]);
        const user = result.rows[0];
        if(!user){
            return done(null, false);
        } else {
            return done(null, user);
        }
    } catch (error) {
        return done(error, false);
    }
}));
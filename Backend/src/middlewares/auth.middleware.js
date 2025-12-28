import  { supabase } from "../config/supabase.config.js";
import CustomError from "../utils/error.js";


export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new CustomError("No token provided", 401);
        }

        const token = authHeader.replace("Bearer ", "");

        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data?.user) {
            throw new CustomError("Unauthorized", 401);
        }

        req.user = data.user;
        next();
    } catch (error) {
        next(error);
    }
};

import jwt from 'jsonwebtoken';
import envConfig from '../config/envConfig.js';
const authenticateUser = async (req, res, next) => {
    try {
        // Get token from cookie
        const token = req.cookies.token;

        if (!token) {
            const err = new Error();
            err.message = "Authentication required. Please login.";
            return next(err);
        }

        // Verify token
        const decoded = jwt.verify(token, envConfig.jwt_secrete);
        
        // Set userId in request object
        req.userId = decoded.userId;
        
        next();
    } catch (error) {
        const err = new Error();
        err.status = 401;
        err.message = "Invalid token. Please login again.";
        return next(err);
    }
};

export default authenticateUser;
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

export const middleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    // console.log('token in middleware: ', token) 

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded?.id

        next();
    } catch (error) {
        res.status(400).json({
            message: 'Login session expired.',
            success: false
        })
    }
});

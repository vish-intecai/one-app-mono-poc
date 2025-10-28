import { NextFunction, Request, Response } from "express";

const bearerTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || typeof authHeader !== 'string') {
        return Responder.errorResponse(res, "Authorization Bearer token is required", 400);
    }
    if (!authHeader.startsWith('Bearer ')) {
        return Responder.errorResponse(res, "Authorization Bearer token is required", 400);
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return Responder.errorResponse(res, "Authorization Bearer token is required", 400);
    }
    // Attach token to req.headers for downstream usage
    req.headers['token'] = token;
    next();
};

export default bearerTokenMiddleware;
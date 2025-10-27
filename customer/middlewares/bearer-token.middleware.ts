import { verifyToken } from "@utils/jwt.util";
import Responder from "@utils/responder.util";
import { NextFunction, Request, Response } from "express";
import { CustomerService } from "service/customer.service";

const bearerTokenMiddleware =async (req: Request, res: Response, next: NextFunction) => {
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
    
    req.headers['token'] = token;
    const decoded:any = verifyToken(token);
    if (!decoded) {
        return Responder.errorResponse(res, "Invalid token", 401);
    }
    req.headers['id'] = decoded.id;

    const customer:any = await CustomerService.findById(decoded.id as string);
    if (!customer) {
        return Responder.errorResponse(res, "Customer not found", 404);
    }
    next();
};

export default bearerTokenMiddleware;
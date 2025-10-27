import AuthService from "@services/auth.service";
import Responder from "@utils/responder.util";
import { Request, Response } from "express";


class AuthController {

    static signIn = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const response = await AuthService.signIn(email, password);
             Responder.successResponse(res, response);
        } catch (error:any) {
            console.log(error);
             Responder.errorResponse(res, error);
        }
    }
    static signUp = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;
            const response = await AuthService.signUp(name, email, password);
            Responder.successResponse(res, response);
        } catch (error:any) {
            console.log(error);
            Responder.errorResponse(res, error);
        }
    }
    static verify = async (req: Request, res: Response) => {
        try {
            const token = req.headers['authorization'] as string;
            console.log(token);
            const response =    await AuthService.verify(token);
            Responder.successResponse(res, response);
        } catch (error:any) {
            console.log(error);
            Responder.errorResponse(res, error  );
        }
    }
    static profile = async (req: Request, res: Response) => {
        try {
            const token = req.headers['authorization'] as string;
            const { isActive, email, name } = req.body;
            const response =  await AuthService.profile(token, isActive, email, name);
            Responder.successResponse(res, response);
        } catch (error:any) {
            console.log(error);
            Responder.errorResponse(res, error);
        }
    }   
}

export default AuthController
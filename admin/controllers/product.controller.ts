import AuthService from "@services/auth.service";
import ProductService from "@services/product.service";
import Responder from "@utils/responder.util";
import { Request, Response } from "express";


class ProductController {
    static getProducts = async (req: Request, res: Response) => {
        try {
            const { page, limit, search } = req.query;
            const response = await ProductService.getProducts(Number(page), Number(limit), String(search));
            Responder.successResponse(res, response);
        } catch (error:any) {
            console.log(error);
            Responder.errorResponse(res, error);
        }
    }   
    static deleteProducts = async (req: Request, res: Response) => {
        try {
            const {ids} = req.body;
            const response = await ProductService.deleteProducts(ids);
            Responder.successResponse(res, response);
        } catch (error:any) {
            console.log(error);
            Responder.errorResponse(res, error);
        }
    }
    static updateProduct = async (req: Request, res: Response) => {
        try {
            const { id, name, description, price } = req.body;
            const updateFields: Record<string, any> = {};
            if (name) updateFields.name = name;
            if (description) updateFields.description = description;
            if (price) updateFields.price = price;
            const response = await ProductService.updateProduct(id, updateFields);
            Responder.successResponse(res, response);
        } catch (error:any) {
            console.log(error);
            Responder.errorResponse(res, error);
        }
    }
    static addProducts = async (req: Request, res: Response) => {
        try {
            const { products } = req.body;
            const response = await ProductService.addProducts(products);
            Responder.successResponse(res, response);
        } catch (error:any) {
            console.log(error);
            Responder.errorResponse(res, error);
        }
    }
  
}

export default ProductController;
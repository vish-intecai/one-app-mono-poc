import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Responder from "@utils/responder.util";
import { generateToken } from "@utils/jwt.util";
import { CustomerService } from "@services/customer.service";



export class CustomerController {
  static async signUp(req: Request, res: Response) {
    const { name, email, password, phone, address } = req.body;

    try {
      const existingCustomer:any = await CustomerService.findByEmail(email);
      if (existingCustomer) {
        return Responder.errorResponse(res, "Customer already exists with this email", 400);
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const customer:any = await CustomerService.createCustomer({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
      });

      return Responder.successResponse(res, customer, 201);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }


  static async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const customer = await CustomerService.findByEmail(email);
      if (!customer) return Responder.errorResponse(res, "Customer not found", 404);

      const isMatch = await bcrypt.compare(password, customer.password);
      if (!isMatch) return Responder.errorResponse(res, "Invalid credentials", 401);

      const token = generateToken({
        customerId: customer._id,
      });

      return Responder.successResponse(res, {
        message: "Login successful",
        token,
        customer: {
          id: customer._id,
          name: customer.name,
          email: customer.email,
        },
      });
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }
}

import { Request, Response } from "express";
import Responder from "@utils/responder.util";
import bcrypt from "bcryptjs";
import { generateToken } from "@utils/jwt.util";
import { SellerService } from "service/seller.service";

export class SellerController {
  // 🧾 Seller Signup (with Shop creation)
  static async signUp(req: Request, res: Response) {
    const { name, email, password, shop_name, shop_address, contactNumber } = req.body;

    try {
      const existingSeller = await SellerService.findByEmail(email);
      if (existingSeller) {
        return Responder.errorResponse(res, "Seller already exists with this email", 400);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const { seller, shop } = await SellerService.createSeller({
        name,
        email,
        password: hashedPassword,
        shop_name,
        shop_address,
        contactNumber,
      });

      return Responder.successResponse(res, { seller, shop }, 201);
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }

  // 🔐 Seller Sign-in (with JWT token)
  static async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const seller = await SellerService.findByEmail(email);
      if (!seller) return Responder.errorResponse(res, "Seller not found", 404);

      const isMatch = await bcrypt.compare(password, seller.password);
      if (!isMatch) return Responder.errorResponse(res, "Invalid credentials", 401);

      // Generate JWT token with seller details
      const token = generateToken({
        sellerId: seller._id,
        email: seller.email,
        name: seller.name,
      });

      return Responder.successResponse(res, {
        message: "Login successful",
        token,
        seller: {
          id: seller._id,
          name: seller.name,
          email: seller.email,
        },
      });
    } catch (error: any) {
      return Responder.errorResponse(res, error.message);
    }
  }
}

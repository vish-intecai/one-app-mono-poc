import express from "express";
import { ShopController } from "@controllers/shop.controller";

const router = express.Router();

// ➕ Create new shop
router.post("/", ShopController.createShop);

// 📋 Get all shops
router.get("/", ShopController.getAllShops);

// 📄 Get shop by ID
router.get("/:id", ShopController.getShopById);

// 🔄 Update shop
router.put("/:id", ShopController.updateShop);

// ❌ Delete shop
router.delete("/:id", ShopController.deleteShop);

export default router;

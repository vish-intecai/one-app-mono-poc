import { OrderModel } from "@models/order.model";



export class OrderService {
    static async createOrder(order: any) {
        const newOrder = await OrderModel.create(order);
        return newOrder;
    }
    static async getOrderById(id: string) {
        const order = await OrderModel.findById(id);
        return order;
    }
    static async getOrdersByCustomerId(customerId: string) {
        const orders = await OrderModel.find({ customerId });
        return orders;
    }
}
// seller/controllers/order.controller.ts

export class OrderHandler {
  static async handleNewOrder(order: any) {
    console.log('New order received:', order);
  }
}
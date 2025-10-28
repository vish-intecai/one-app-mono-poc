
export class OrderHandler {
  static async handleNewOrder(order: any) {
    try {
      console.log('New order received:', JSON.stringify(order, null, 2));
      
    } catch (error) {
      console.error('Error handling new order:', error);
    }
  }
  
}
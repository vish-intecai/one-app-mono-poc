import { getIO } from '@/socket/index';

export class OrderHandler {
  static async handleNewOrder(order: any) {
    try {
      console.log('New order received:', JSON.stringify(order, null, 2));
      
      const io = getIO();
      if (!io) {
        console.error('Socket.io not initialized');
        return;
      }
      
      const orderPayload = {
        ...order,
        timestamp: new Date().toISOString()
      };
      
      // Extract unique shop IDs from order items
      const shopIds = order.items?.map((item: any) => item.shop).filter(Boolean);
      
      if (shopIds && shopIds.length > 0) {
        // Emit to all relevant shops
        shopIds.forEach((shopId: string) => {
          io.to(`shop:${shopId}`).emit("order:created", orderPayload);
          console.log(`Order emitted to shop room: shop:${shopId}`);
        });
        io.to(`shop:${order.shop}`).emit("order:ack", { orderId: order._id, shopId: order.shop });
        console.log(`Order acknowledged to shop: ${order.shop}`);
      } else {
        console.warn('No shop IDs found in order items');
      }
      
      console.log('Order details emitted to connected shops');
    } catch (error) {
      console.error('Error handling new order:', error);
    }
  }
  
  /**
   * Send order to a specific seller by their ID
   */
  static sendOrderToSeller(sellerId: string, order: any) {
    const io = getIO();
    if (io) {
      const orderPayload = {
        ...order,
        timestamp: new Date().toISOString()
      };
      
      io.to(`seller:${sellerId}`).emit('order:new', orderPayload);
      console.log(`Order details sent to seller ${sellerId}`);
    }
  }
  
  /**
   * Send order to multiple specific sellers
   */
  static sendOrderToSellers(sellerIds: string[], order: any) {
    const io = getIO();
    if (io) {
      const orderPayload = {
        ...order,
        timestamp: new Date().toISOString()
      };
      
      sellerIds.forEach(sellerId => {
        io.to(`seller:${sellerId}`).emit('order:new', orderPayload);
      });
      console.log(`Order details sent to sellers: ${sellerIds.join(', ')}`);
    }
  }
}
import { DeliveryAgentModel } from "@models/delivery-agent.model";


export class DeliveryPartnerService {
    static async createDeliveryPartner(deliveryPartner: any) {
        const newDeliveryPartner = await DeliveryAgentModel.create(deliveryPartner);
        return newDeliveryPartner;
    }

    static async updateDeliveryPartner(id: string, deliveryPartner: any) {
        const updatedDeliveryPartner = await DeliveryAgentModel.findByIdAndUpdate(id, deliveryPartner, { new: true });
        return updatedDeliveryPartner;
    }
    static async getDeliveryPartnerByEmail(email: string) {
        const deliveryPartner = await DeliveryAgentModel.findOne({ email });
        return deliveryPartner;
    }
    static async getDeliveryPartnerById(data: any) {
        const { id } = data;
        console.log(id);
        const deliveryPartner = await DeliveryAgentModel.findById(data.id);
     
        if (!deliveryPartner) {
            throw new Error("Delivery partner not found");
        }
        return deliveryPartner;
    }
}

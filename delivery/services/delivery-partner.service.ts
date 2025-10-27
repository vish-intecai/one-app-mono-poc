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

}

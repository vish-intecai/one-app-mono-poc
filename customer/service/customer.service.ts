import { CustomerModel } from "@models/customer.model";

export class CustomerService {
  // ✅ Create new customer
  static async createCustomer(customerData: any) {
    const newCustomer = await CustomerModel.create(customerData);
    return newCustomer;
  }

  // ✅ Update customer details
  static async updateCustomer(id: string, data: any) {
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedCustomer;
  }

  // ✅ Find by email (for sign-in)
  static async findByEmail(email: string) {
    return await CustomerModel.findOne({ email });
  }
  static async findById(id: string) {
    const customer = await CustomerModel.findById(id);
    if (!customer) {
      throw new Error("Customer not found");
    }
    return customer;
  }
}

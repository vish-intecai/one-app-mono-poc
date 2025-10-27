import { AdminModel } from "@models/admin.model";





export class AdminService {
    static async createAdmin(admin: any) {
        const newAdmin = await AdminModel.create(admin);
        return newAdmin;
    }
    static async getAdminByEmail(email: string) {
        const admin = await AdminModel.findOne({ email });
        return admin;
    }
    static async getAdminById(id: string) {
        const admin = await AdminModel.findById(id);
        return admin;
    }
    static async updateAdmin(id: string, admin: any) {
        const updatedAdmin = await AdminModel.findByIdAndUpdate(id, admin, { new: true });
        return updatedAdmin;
    }
}   
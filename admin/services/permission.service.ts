import { PermissionModel } from "@models/permission.model";

export class PermissionService {
    static async createPermission(permission: any) {
        const newPermission = await PermissionModel.create(permission);
        return newPermission;
    }

    static async getPermissionById(id: string) {
        const permission = await PermissionModel.findById(id);
        return permission;
    }

    static async getPermissionByName(name: string) {
        const permission = await PermissionModel.findOne({ name });
        return permission;
    }

    static async getAllPermissions() {
        const permissions = await PermissionModel.find({ isActive: true });
        return permissions;
    }

    static async updatePermission(id: string, permission: any) {
        const updatedPermission = await PermissionModel.findByIdAndUpdate(id, permission, { new: true });
        return updatedPermission;
    }

    static async deletePermission(id: string) {
        const permission = await PermissionModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
        return permission;
    }
}


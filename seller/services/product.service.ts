import { parseGrpcData } from "@utils/parser";
import { gRPC_product_client } from "grpc/client";





class ProductService {
    static getProducts = async (page: number, limit: number, search: string) => {
        return new Promise((resolve, reject) => {
            gRPC_product_client.getProducts_RPC_Function({ data: JSON.stringify({ page: page || 1, limit: limit || 10, search: search || "" }) }, (error: any, response: any) => {
                if (error) {
                    return reject(error);
                }
                return resolve(parseGrpcData(response));
            });
        });
    }
    static deleteProducts = async (ids: string[]) => {
        return new Promise((resolve, reject) => {
            gRPC_product_client.deleteProducts_RPC_Function({ data: JSON.stringify( ids ) }, (error: any, response: any) => {
                if (error) {
                    return reject(error);
                }
                return resolve(parseGrpcData(response));
            });
        });
    }
    static updateProduct = async (id: number, product: any) => {
        return new Promise((resolve, reject) => {
            gRPC_product_client.updateProduct_RPC_Function({ data: JSON.stringify({ ...product, id }) }, (error: any, response: any) => {
                if (error) {
                    return reject(error);
                }
                return resolve(parseGrpcData(response));
            });
        });
    }
    static addProducts = async (products: any[]) => {
        return new Promise((resolve, reject) => {
            gRPC_product_client.addProducts_RPC_Function({ data: JSON.stringify( products ) }, (error: any, response: any) => {
                if (error) {
                    return reject(error);
                }
                return resolve(parseGrpcData(response));
            });
        });
    }   
}

export default ProductService;
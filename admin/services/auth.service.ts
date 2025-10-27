
import * as grpc from "@grpc/grpc-js";
import { parseGrpcData } from "@utils/parser";
import { gRPC_auth_client } from "grpc/client";

/**
 * Helper to extract and safely parse gRPC response data.
 * If response.data is JSON, parse it; otherwise, return as is.
 */


class AuthService {
    static signIn = async (email: string | undefined, password: string) => {
        return new Promise((resolve, reject) => {
            gRPC_auth_client.signIn_RPC_Function(
                { data: JSON.stringify({ email, password }) },
                (error: any, response: any) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(parseGrpcData(response));
                }
            );
        });
    }
    static signUp = async (name: string, email: string, password: string) => {
        return new Promise((resolve, reject) => {
            gRPC_auth_client.signUp_RPC_Function(
                { data: JSON.stringify({ name, email, password }) },
                (error: any, response: any) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(parseGrpcData(response));
                }
            );
        });
    }
    static verify = async (token: string) => {
        console.log("Token:", token);
        return new Promise((resolve, reject) => {
          // Create metadata and attach Authorization header
          const metadata = new grpc.Metadata();
          metadata.add("authorization", `${token}`);
      
          // Make the gRPC call with metadata
          gRPC_auth_client.verify_RPC_Function(
            { data: JSON.stringify({}) },
            metadata, // attach metadata here
            (error: any, response: any) => {
              if (error) {
                return reject(error);
              }
              resolve(parseGrpcData(response));
            }
          );
        });
      };
    static profile = async (token: string, isActive: boolean, email: string, name: string) => {
        
        const metadata = new grpc.Metadata();
        metadata.add("authorization", `${token}`);
        return new Promise((resolve, reject) => {
            gRPC_auth_client.updateProfile_RPC_Function(
                { data: JSON.stringify({ isActive, email, name }) },
                metadata, // attach metadata here
                (error: any, response: any) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(parseGrpcData(response));
                }
            );
        });
    }
}

export default AuthService;

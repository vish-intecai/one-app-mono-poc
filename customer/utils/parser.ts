export function parseGrpcData(response: any): any {
    try {
        if (typeof response?.data === "string") {
            return JSON.parse(response.data);
        }
        return response?.data;
    } catch (e) {
        // If parsing fails, return raw data
        return response?.data;
    }
}
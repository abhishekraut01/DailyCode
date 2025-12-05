export class ApiResponse<T> {
    public success: boolean;
    public statusCode: number;
    public message: string;
    public data?: T;

    constructor(statusCode: number, message: string, data?: T) {
        this.success = statusCode >= 200 && statusCode < 300;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

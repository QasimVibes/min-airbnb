class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
    }
}

export { ApiError }
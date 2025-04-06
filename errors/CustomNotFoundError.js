class CustomNotFoundError extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = 404;

        this.name = "CustomNo";
    }
}
export default CustomNotFoundError;
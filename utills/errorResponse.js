class errorResponse extends Error{
    constructor(messsage, statusCode){
        super(messsage);
        this.statusCode = statusCode;
    }
}

module.exports = errorResponse;
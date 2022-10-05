const validator = (schema, dataOrigin) => {
    const myMw = (request, response, next) => {
    // Validate on request
        const { error } = schema.validate(request[dataOrigin]);
        // Check of property error
        // If property error then response send to front
        if (error) {
            
            return response.status(400).json(error.message);
        }
        
        // if not, it is sent to the middleware
        return next();
    };
    return myMw;
};

module.exports = validator;
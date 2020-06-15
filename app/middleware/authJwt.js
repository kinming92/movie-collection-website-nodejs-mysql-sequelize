/* 
to authenticate and authorization
we have these functions
- check if token is provided.
We get token from x-acess-token of http headers, then use jsonwebtoken's verify() function
- check if roles of the user contains required role or not

*/

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
    let token = req.query.access_token;
    //let token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token , config.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const authJwt = {
    verifyToken: verifyToken
};

module.exports = authJwt;

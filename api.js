const express = require("express");
const router = express.Router();
const Token = require("./Token");

router.get("/token", (request, response) => {
    Token.find({})                        // get all data from db
        .then(token => {
            response.send(token);
        });
});

router.post("/token", (request, response) => {
    Token.create(request.body)
        .then(token => {
            response.send(token);
        });
});

router.put("/token/:id", (request, response) => {
    Token.findByIdAndUpdate({_id: request.params.id}, request.body)
        .then(() => {
            Token.findOne({_id: request.params.id})
                .then(token => {
                    response.send(token);
                });
        });
});

router.delete("/token/:id", (request, response) => {
    Token.deleteOne({_id: request.params.id})
        .then(token => {
            response.send(token);
        });
});

module.exports = router;
const express = require("express");
const router = express.Router();
const User = require("./User");

router.get("/users", (request, response) => {
    Token.find({})                        // get all data from db
        .then(user => {
            response.send(user);
        });
});

router.post("/users", (request, response) => {
    Token.create(request.body)
        .then(user => {
            response.send(user);
        });
});

router.put("/users/:id", (request, response) => {
    Token.findByIdAndUpdate({_id: request.params.id}, request.body)
        .then(() => {
            Token.findOne({_id: request.params.id})
                .then(user => {
                    response.send(user);
                });
        });
});

router.delete("/users/:id", (request, response) => {
    Token.deleteOne({_id: request.params.id})
        .then(user => {
            response.send(user);
        });
});

module.exports = router;
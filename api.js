const express = require("express");
const router = express.Router();
const Auth = require("./Auth");

router.get("/auth", (request, response) => {
    Auth.find({})                        // get all data from db
        .then(auth => {
            response.send(auth);
        });
});

router.post("/auth", (request, response) => {
    Auth.create(request.body)
        .then(auth => {
            response.send(auth);
        });
});

router.put("/auth/:id", (request, response) => {
    Auth.findByIdAndUpdate({_id: request.params.id}, request.body)
        .then(() => {
            Auth.findOne({_id: request.params.id})
                .then(auth => {
                    response.send(auth);
                });
        });
});

router.delete("/auth/:id", (request, response) => {
    Auth.deleteOne({_id: request.params.id})
        .then(auth => {
            response.send(auth);
        });
});

module.exports = router;
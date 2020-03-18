const express = require("express");
const router = express.Router();
const Auth = require("./Auth");

router.options('*', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set("Access-Control-Allow-Headers", "Content-Type");
    res.send('ok');
});

router.get("/auth", (request, response) => {
    Auth.find({})                        // get all data from db
        .then(auth => {
            response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
            response.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
            response.set('Access-Control-Allow-Credentials', 'true');
            response.set('Access-Control-Allow-Headers', 'Content-Type');
            response.send(auth);
        });
});

router.post("/auth", (request, response) => {
    Auth.create(request.body)
        .then(auth => {
            response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
            response.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
            response.set('Access-Control-Allow-Credentials', 'true');
            response.set('Access-Control-Allow-Headers', 'Content-Type');
            response.send(auth);
        });
});

router.put("/auth/:id", (request, response) => {
    Auth.findByIdAndUpdate({_id: request.params.id}, request.body)
        .then(() => {
            Auth.findOne({_id: request.params.id})
                .then(auth => {
                    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
                    response.set('Access-Control-Allow-Methods', 'PUT, OPTIONS');
                    response.set('Access-Control-Allow-Credentials', 'true');
                    response.set('Access-Control-Allow-Headers', 'Content-Type');
                    response.send(auth);
                });
        });
});

router.delete("/auth/:id", (request, response) => {
    Auth.deleteOne({_id: request.params.id})
        .then(auth => {
            response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
            response.set('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
            response.set('Access-Control-Allow-Credentials', 'true');
            response.set('Access-Control-Allow-Headers', 'Content-Type');
            response.send(auth);
        });
});

module.exports = router;
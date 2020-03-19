const express = require("express");
const router = express.Router();
const Auth = require("./Auth");

const headers = (response) => {
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.set('Access-Control-Allow-Credentials', 'true');
    response.set('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Authorization, Content-Type');

}

router.options('*', (req, res) => {
    headers(res)
    res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.send('ok');
});

router.get("/auth", (request, response) => {
    Auth.find({})                        // get all data from db
        .then(auth => {
            headers(response, auth)
            response.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
            response.send(auth);
        });
});

router.post("/login", (request, response) => {
    const userData = {
        login: request.body.username,
        pass: request.body.password
    }
            headers(response)
            response.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
            response.send(userData)
});

router.post("/auth", (request, response) => {
    Auth.create(request.body)
        .then(auth => {
            headers(response)
            response.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
            response.send(auth)
        });
});

router.put("/auth/:id", (request, response) => {
    Auth.findByIdAndUpdate({_id: request.params.id}, request.body)
        .then(() => {
            Auth.findOne({_id: request.params.id})
                .then(auth => {
                    headers(response)
                    response.set('Access-Control-Allow-Methods', 'PUT, OPTIONS');
                    response.send(auth)
                });
        });
});

router.delete("/auth/:id", (request, response) => {
    Auth.deleteOne({_id: request.params.id})
        .then(auth => {
            headers(response,)
            response.set('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
            response.send(auth)
        });
});

module.exports = router;
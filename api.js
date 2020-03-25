const express = require("express");
const router = express.Router();
const User = require("./User");

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

router.get("/users", (request, response) => {
    User.find({})                        // get all data from db
        .then(user => {
            headers(response, user)
            response.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
            response.send(user);
        })
    //.then(response.send({status: "OK"}))
});

// router.post("/users", (request, response) => {
//     const userData = {
//         username: request.body.username,
//         pass: request.body.password
//     }
//             headers(response)
//             response.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
//             response.send(userData)
// });

//нельзя сразу 2 маршрута прописывать с одним и тем же методом

router.post("/users", (request, response) => {
    User.create(request.body)
        .then(user => {
            headers(response)
            response.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
            response.send(user)
        });
});

router.put("/users/:id", (request, response) => {
    User.findByIdAndUpdate({_id: request.params.id}, request.body)
        .then(() => {
            Auth.findOne({_id: request.params.id})
                .then(user => {
                    headers(response)
                    response.set('Access-Control-Allow-Methods', 'PUT, OPTIONS');
                    response.send(user)
                });
        });
});

router.delete("/users/:id", (request, response) => {
    User.deleteOne({_id: request.params.id})
        .then(user => {
            headers(response,)
            response.set('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
            response.send(user)
        });
});

module.exports = router;
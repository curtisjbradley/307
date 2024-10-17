import express from "express";
import cors from "cors";
import userServices from "./models/user-services.js"

const app = express();
const port = 8001;

app.use(cors())
app.use(express.json());



const users = {
    users_list: [
    ]

};


app.get("/", (req, res) => {

    userServices.getUsers(undefined, undefined).then((users) => {
        res.status(200).send(users);
    }).catch((err) => {
        res.status(500).send(err);
    })

});

app.get("/users", (req, res) => {
    console.log("Requesting users");
    userServices.getUsers(req.query.name, req.query.job).then((users) => {
        res.status(200).send({users_list: users});
    }).catch((err) => {
        res.status(500).send(err);
    })

})



app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
   userServices.findUserById(id).then(result => {
       if (result === undefined) {
           res.status(404).send("User not found!");
       } else {
           res.send(result);
       }
   }).catch((err) => {
       res.status(500).send(err);
   })

})



app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userServices.addUser(userToAdd).then((user) => {
        res.status(201).send(user);
    }).catch((err) => {
        res.status(500).send(err);
    })
})

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];

    userServices.removeUser(id).then(res =>{
        res.status(204).send("Deleted user");
    }).catch(err=>{
        res.status(500).send(err)
    })
    let index = users["users_list"].findIndex(user => user["_id"] === id);
    users["users_list"].splice(index, 1);

})

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
app.use(cors())

const users = {
    users_list: [
        {
            id: "xyz789",
            name: "Charlie",
            job: "Janitor"
        },
        {
            id: "abc123",
            name: "Mac",
            job: "Bouncer"
        },
        {
            id: "ppp222",
            name: "Mac",
            job: "Professor"
        },
        {
            id: "yat999",
            name: "Dee",
            job: "Aspring actress"
        },
        {
            id: "zap555",
            name: "Dennis",
            job: "Bartender"
        }
    ]
};

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result = users;
    if(name !== undefined) {
        result = findUserByName(users["users_list"], name);
        result = {users_list: result}
    }
    if (job !== undefined) {
        result = findUserByJob(result["users_list"], job);
        result = {users_list: result}
    }

    res.send(result);

})

const findUserByName = (list, name) => {
    return list.filter(
        (user) => user["name"] === name
    );
};
const findUserByID = (id) => {
    return users["users_list"].find(
        (user) => user["id"] === id
    );
}
const findUserByJob = (list, job) => {
    return list.filter(
        (user) => user["job"] === job
    );
};

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    let result = findUserByID(id);
    if (result === undefined) {
        res.status(404).send("User not found!");
    } else {
        res.send(result);
    }
})

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
}

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(201).send("Added");
})

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    let index = users["users_list"].findIndex(user => user["id"] === id);
    users["users_list"].splice(index, 1);
    res.send("Deleted");
})

app.listen(port, () => {
    console.log(
        `Example app listening at http://localhost:${port}`
    );
});
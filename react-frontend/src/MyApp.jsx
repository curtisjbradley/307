import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';


const port = 8001

function MyApp() {



    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetchUsers().then(res => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => {
                console.log(error)})
    }, []);

    function removeOneCharacter(index) {
        deleteUser(characters[index]).then(() => {
            const updated = characters.filter((c, i) => i !== index);
            setCharacters(updated);
        }).catch((err)=> console.log(err));

    }

    function updateList(person) {
        if(person.job.length < 3){
            throw new Error("Job must have more than 2 letters")
        }
        postUser(person).then((res) => {
            if (res.status === 201) {
                res.json().then((json) =>{

                    setCharacters([...characters, json]);
                })
            }
        }).catch((err) => console.log(err))
    }

    return (
        <div className="container">
            <h1>Users</h1>
            <Table characterData={characters}
                   removeCharacter={removeOneCharacter}/>
            <Form handleSubmit={updateList}/>
        </div>
    );




    async function fetchUsers() {
        const promise = await fetch(`http://localhost:${port}/users`)
        return promise
    }

    async function postUser(person) {
        const promise = await fetch(`http://localhost:${port}/users`, {
            method: "POST",
            body: JSON.stringify(person),
            headers: {
                "Content-Type": "application/json",
            }
        })

        return promise
    }
    async function deleteUser(person) {
        const promise = await fetch(`http://localhost:${port}/users/` + person["_id"], {
            method: "DELETE",
            body: JSON.stringify(person),
            headers: {
                "Content-Type": "application/json",
            }
        })

        return promise
    }


}
export default MyApp;
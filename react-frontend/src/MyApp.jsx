import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';



function MyApp() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetchUsers().then(res => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => {
                console.log(error)})
    }, []);

    function removeOneCharacter(index) {
        const updated = characters.filter((c, i) => i !== index);
        setCharacters(updated);
        console.log(index);
    }

    function updateList(person) {
        setCharacters([...characters, person]);
    }

    return (
        <div className="container">
            <h1>Hello, React!</h1>
            <Table characterData={characters}
                   removeCharacter={removeOneCharacter}/>
            <Form handleSubmit={updateList}/>
        </div>
    );




    async function fetchUsers() {
        const promise = await fetch("http://localhost:8000/users")
        console.log(promise)
        return promise
    }


}
export default MyApp;
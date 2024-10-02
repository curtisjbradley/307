import React, {useState} from 'react';
import Table from './Table';
import Form from './Form';



function MyApp() {
    const [characters, setCharacters] = useState([]);
    function removeOneCharacter(index) {
        const updated = characters.filter((c,i) => i !== index);
        setCharacters(updated);
        console.log(index);
    }

    function updateList(person) {
        setCharacters([...characters,person]);
    }

    return (
        <div className="container">
            <h1>Hello, React!</h1>
            <Table characterData={characters}
            removeCharacter={removeOneCharacter} />
            <Form handleSubmit={updateList} />
        </div>
    );
}


export default MyApp;
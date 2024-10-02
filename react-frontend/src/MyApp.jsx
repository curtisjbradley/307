import React, {useState} from 'react';
import Table from './Table';



function MyApp() {
    const [characters, setCharacters] = useState([
        {
            name: "Charlie",
            job: "Janitor"
        },
        {
            name: "Mac",
            job: "Bouncer"
        },
        {
            name: "Dee",
            job: "Aspiring actress"
        },
        {
            name: "Dennis",
            job: "Bartender"
        }
    ]);
    function removeOneCharacter(index) {
        const updated = characters.filter((c,i) => i !== index);
        setCharacters(updated);
        console.log(index);
    }

    return (
        <div className="container">
            <h1>Hello, React!</h1>
            <Table characterData={characters}
            removeCharacter={removeOneCharacter} />

        </div>
    );
}


export default MyApp;
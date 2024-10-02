import React, {useState} from "react";


function Form(props) {
    const [person, setPerson] = useState({
        name: "",
        job: ""
    });
    function handleChange(event) {
        const {name, value} = event.target;
        if (name === "job")
            setPerson({name: person["name"], job: value});
        else setPerson({name: value, job: person["job"]});
    }
    function submitForm(){
        props.handleSubmit(person);
        setPerson({name:"",job:""});
    }


    return (
        <form>
            <label htmlFor="person"></label>
            <input
                type="text"
                name="name"
                id="name"
                value={person.name}
                onChange={handleChange}
            />
            <input
                id="job"
                name="job"
                value={person.job}
                onChange={handleChange}
                type="text"
            />
            <input type="button" value="Submit" onClick={submitForm}/>
        </form>

    )
        ;
}


export default Form
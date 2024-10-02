import React, {useState} from "react";


function Form() {
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
      </form>
    );
}



export default Form
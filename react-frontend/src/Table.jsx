import React from 'react';

function TableHeader() {
    return (
        <thead>
        <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Id</th>
        </tr>
        </thead>
    );
}

function TableBody(props) {
    // eslint-disable-next-line react/prop-types
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.job}</td>
                <td>{row._id}</td>
                <td>
                    <button onClick={() => props.removeCharacter(index)}>
                        Delete
                    </button>
                </td>
            </tr>


        );
    });
    return (
        <tbody>
        {rows}
        </tbody>
    );
}

function Table(props) {
    return (
        <table>
        <TableHeader />
        <TableBody characterData={props.characterData}
        removeCharacter={props.removeCharacter} />
    </table>
    );
}
export default Table;

import React from "react";
import { useParams } from "react-router-dom";

function Discipline() {
    let { disciplineID } = useParams();
    return(
        <div>discipline works {disciplineID}</div>
    );
}

export default Discipline;
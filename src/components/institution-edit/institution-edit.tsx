import React from "react";
import { useParams } from "react-router-dom";

import './institution-edit.scss';

function InstitutionEdit () {
    const { studyInstitution } = useParams();
    
    return(
        <div>djsakdsaj {studyInstitution}</div>
    );
}

export default InstitutionEdit;
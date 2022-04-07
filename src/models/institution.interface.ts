export default interface Institution {
    _id?: string; 
    studyInstitution: string;
    faculties: Faculty[]
}

export interface Faculty {
    faculty: string;
    departments: string[];
}
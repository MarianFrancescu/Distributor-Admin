export default interface Institution {
    studyInstitution: string;
    faculties: Faculty[]
}

export interface Faculty {
    faculty: string;
    departments: string[];
}
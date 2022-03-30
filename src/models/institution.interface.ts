export interface Institution {
    institution: string;
    faculties: Faculty[]
}

export interface Faculty {
    faculty: string;
    departments: string[];
}
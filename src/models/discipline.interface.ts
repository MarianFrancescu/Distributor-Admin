export interface Discipline {
    _id?: string;
    teacher: string;
    name: string;
    timetable?: Timetable[];
    studyInstitution: string;
    faculty: string;
    department: string;
    studyYear: string;
    maxNoOfStudentsPerTimetable: number;
    created?: string;
  }
  
  interface Timetable {
    option: string;
    students?: string[];
  }
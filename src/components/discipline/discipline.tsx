import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../../services/service";
import DisciplineInterface from "../../models/discipline.interface";
import './discipline.scss';

interface MyFormValues {
    name: string;
    teacher: string;
    studyInstitution: string;
    faculty: string;
    department: string;
    studyYear: string;
    maxNoOfStudentsPerTimetable: string;
    timetable: Array<any>;
}

function Discipline() {
    const [discipline, setDiscipline] = useState<any>();
    const { disciplineID } = useParams();

    const getDisciplineData = async () => {
        try {
            const response = await service.getDiscipline(disciplineID as string);
            const disciplineResponse = response as DisciplineInterface;
            console.log(disciplineResponse);
            setDiscipline(disciplineResponse);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDisciplineData();
    }, []);

    const initialValues: MyFormValues = {
        name: discipline?.name ? discipline?.name : '',
        teacher: discipline?.teacher ? discipline?.teacher : '',
        studyInstitution: discipline?.studyInstitution ? discipline?.studyInstitution : '',
        faculty: discipline?.faculty ? discipline?.faculty : '',
        department: discipline?.department ? discipline?.department : '',
        studyYear: discipline?.studyYear ? discipline?.studyYear : '',
        maxNoOfStudentsPerTimetable: discipline?.maxNoOfStudentsPerTimetable ? discipline?.maxNoOfStudentsPerTimetable : '',
        timetable: []
    };
    return discipline ? (
        <div className="discipline-container">
            <h1>Edit Discipline</h1>

            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    console.log({ values, actions });
                    //    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
            >
                <Form>
                    <label htmlFor="name">First Name</label>
                    <Field id="name" name="name" placeholder="First Name" />
                    <label htmlFor="teacher">Teacher</label>
                    <Field id="teacher" name="teacher" placeholder="Teacher" />
                    <label htmlFor="studyInstitution">Study institution</label>
                    <Field id="studyInstitution" name="studyInstitution" placeholder="Study institution" />
                    <label htmlFor="faculty">Faculty</label>
                    <Field id="faculty" name="faculty" placeholder="Faculty" />
                    <label htmlFor="department">Department</label>
                    <Field id="department" name="department" placeholder="Department" />
                    <label htmlFor="studyYear">Study year</label>
                    <Field id="studyYear" name="studyYear" placeholder="Study year" />
                    <label htmlFor="maxNoOfStudentsPerTimetable">Max students</label>
                    <Field id="maxNoOfStudentsPerTimetable" name="maxNoOfStudentsPerTimetable" placeholder="Max students" />
                    {/* <label htmlFor="studyInstitution">Study institution</label>
                <Field id="studyInstitution" name="studyInstitution" placeholder="Study institution" /> */}
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    ) : <span>failed to load discipline. try again later</span>;
}

export default Discipline;
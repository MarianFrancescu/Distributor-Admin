import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../../services/service";
import DisciplineInterface from "../../models/discipline.interface";

interface MyFormValues {
    firstName: string;
  }

function Discipline() {
    const [discipline, setDiscipline] = useState<any>();
    const { disciplineID } = useParams();

    const getDisciplineData = async () => {
        try{
            const response = await service.getDiscipline(disciplineID as string);
            const disciplineResponse = response as DisciplineInterface;
            console.log(disciplineResponse);
            setDiscipline(disciplineResponse);
            
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDisciplineData();
    }, []);
    
    const initialValues: MyFormValues = { firstName: '' };
    return (
        <div>
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
            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" name="firstName" placeholder="First Name" />
            <button type="submit">Submit</button>
            </Form>
        </Formik>
        </div>
    );
}

export default Discipline;
import { TextField, Button } from "@mui/material";
import { Formik, Form, FieldArray, Field } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Institution from "../../models/institution.interface";
import service from "../../services/service";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './institution-edit.scss';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function InstitutionEdit() {
    const [studyInstitution, setStudyInstitution] = useState<Institution>();
    const { institutionID } = useParams();

    const [openSnack, setOpenSnack] = React.useState(false);

    const handleClick = () => {
        setOpenSnack(true);
    };

    const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const getInstitutionData = async () => {
        try {
            const response = await service.getInstitution(institutionID as string);
            const institutionResponse = response as Institution;
            setStudyInstitution(institutionResponse);
        }
        catch (err) {
            console.log(err);
        }
    }

    const updateInstitutionData = (institution: Institution) => {
        service.updateInstitution(institutionID as string, institution).then(() => handleClick());
    }

    useEffect(() => {
        getInstitutionData();
    }, []);

    const initialValues: Institution = {
        studyInstitution: studyInstitution?.studyInstitution ? studyInstitution?.studyInstitution : '',
        faculties: studyInstitution?.faculties ? studyInstitution?.faculties : []
    };

    return studyInstitution ? (
        <div className="institution-container__edit">
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
                    Updated institution details
                </Alert>
            </Snackbar>
            <div className="institution-wrapper">
                <Formik initialValues={initialValues}
                    onSubmit={(values, actions) => {
                        updateInstitutionData(values);
                        actions.setSubmitting(false);
                    }}
                >
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            dirty,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset
                        } = props;
                        return (
                            <Form>
                                <div className="fields">
                                    <TextField className="text-field"
                                        value={values.studyInstitution}
                                        id="studyInstitution"
                                        name="studyInstitution"
                                        // label="Institution"
                                        variant="outlined"
                                        onChange={handleChange} />
                                    {/* <TextField className="text-field" 
                    id="faculty" 
                    name="faculty" 
                    label="Faculty" 
                    variant="outlined" 
                    onChange={handleChange} />
                <TextField className="text-field"
                    id="department"
                    name="department"
                    label="Department"
                    variant="outlined"
                    onChange={handleChange}
                /> */}
                                    <FieldArray
                                        name="faculties"
                                        render={({ insert, remove, push }) => (
                                            <div className="institution-fields">
                                                {values.faculties.length > 0 &&
                                                    values.faculties.map((faculty, index) => (
                                                        <div className="row__institution" key={index}>
                                                            <div className="col">
                                                                <label htmlFor={`faculties.${index}.faculty`}>
                                                                    Faculty
                                                                </label>
                                                                <Field
                                                                    className="field"
                                                                    name={`faculties.${index}.faculty`}
                                                                    placeholder="Faculty"
                                                                    type="text"
                                                                />
                                                                <Button
                                                                    type="button"
                                                                    className="secondary"
                                                                    onClick={() => remove(index)}
                                                                    color="error"
                                                                >
                                                                    <DeleteIcon />
                                                                </Button>
                                                                {/* {errors.timetable &&
                        errors.timetable[index] &&
                        errors.timetable[index].name &&
                        touched.timetable &&
                        touched.timetable[index].name && (
                            <div className="field-error">
                            {errors.timetable[index].name}
                            </div>
                        )} */}
                                                            </div>
                                                            <FieldArray name={`faculties.${index}.departments`}
                                                                render={({ insert, remove, push }) => (
                                                                    <div className="departments-fields">
                                                                        {values.faculties[index].departments?.length > 0 &&
                                                                            values.faculties[index].departments?.map((department, index2) => (
                                                                                <div className="row__institution" key={index2}>
                                                                                    <div className="col">
                                                                                        <label htmlFor={`faculties.${index}.departments`}>Department </label>
                                                                                        <Field
                                                                                            name={`faculties.${index}.departments.${index2}`}
                                                                                            placeholder="Faculty department"
                                                                                            className="field"
                                                                                        />
                                                                                        <Button
                                                                                            type="button"
                                                                                            className="secondary"
                                                                                            onClick={() => remove(index2)}
                                                                                            color="error"
                                                                                        >
                                                                                            <DeleteIcon />
                                                                                        </Button>
                                                                                    </div>
                                                                                    {/* <div className="col__inner">
                                                                                        <Button
                                                                                            type="button"
                                                                                            className="secondary"
                                                                                            onClick={() => remove(index2)}
                                                                                            color="error"
                                                                                        >
                                                                                            <DeleteIcon />
                                                                                        </Button>
                                                                                    </div> */}
                                                                                </div>
                                                                            ))}
                                                                        <Button
                                                                            size="small"
                                                                            variant="outlined"
                                                                            type="button"
                                                                            className="secondary"
                                                                            onClick={() => push('')}
                                                                            startIcon={<AddCircleIcon />}
                                                                        >
                                                                            Department
                                                                        </Button>
                                                                        {/* {errors.timetable &&
                        errors.timetable[index] &&
                        errors.timetable[index].email &&
                        touched.timetable &&
                        touched.timetable[index].email && (
                            <div className="field-error">
                            {errors.timetable[index].email}
                            </div>
                        )}  */}
                                                                    </div>
                                                                )}
                                                            />
                                                        </div>
                                                    ))}
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    type="button"
                                                    className="secondary"
                                                    onClick={() => push({ faculty: "" })}
                                                    startIcon={<AddCircleIcon />}
                                                >
                                                    Faculty
                                                </Button>
                                            </div>
                                        )}
                                    />
                                </div>
                                <Button className="submit-edit__button" variant="contained" type="submit" disabled={!dirty}>Save</Button>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    ) : (
        <span>failed to load discipline. try again later</span>
    );
}

export default InstitutionEdit;
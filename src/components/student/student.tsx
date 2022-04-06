import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Institution from "../../models/institution.interface";
import User from "../../models/user.interface";
import service from "../../services/service";
import './student.scss';

interface MyFormValues extends User {
    firstName: string,
    lastName: string,
    studyYear: string,
    studyInstitution: string,
    faculty: string;
    department: string,
    role: string
}

function Student() {
    const [institutions, setInstitutions] = useState<any>();
    const [faculties, setFaculties] = useState<any>();
    const [departments, setDepartments] = useState<any>();
    const [user, setUser] = useState<User>();
    const { userID } = useParams();

    const ROLES = ['basic', 'admin', 'superAdmin'];

    const getUserData = async () => {
        try {
            const response = await service.getUser(userID as string);
            const userResponse = response as User;
            console.log(userResponse)
            setUser(userResponse);
        } catch (error) {
            console.log(error);
        }
    }

    const getInstitutionsData = async () => {
        try {
            const response = await service.getInstitutions();
            const institutionsResponse = response as Institution[];
            setInstitutions([...institutionsResponse]);
        } catch (error) {
            console.log(error);
        }
    };

    const updateUserData = (user: User) => {
        service.updateUser(userID as string, user);
    }

    const initialValues: MyFormValues = {
        firstName: user?.firstName ? user?.firstName : '',
        lastName: user?.lastName ? user?.lastName : '',
        studyYear: user?.studyYear ? user?.studyYear : '',
        registrationNumber: user?.registrationNumber ? user?.registrationNumber : '',
        studyInstitution: user?.studyInstitution ? user?.studyInstitution : '',
        faculty: user?.faculty ? user?.faculty : '',
        department: user?.department ? user?.department : '',
        role: user?.role ? user?.role : ''
    }

    useEffect(() => {
        getUserData();
        getInstitutionsData();
    }, []);

    const handleInstitutionChange = (obj: any) => {
        const facultiess = institutions.find(
            (i: Institution) => i.studyInstitution === obj.target.value
        ).faculties;
        // setInstitution(obj.target.value);
        setFaculties(facultiess);
        setDepartments(null);
    };

    const handleFacultyChange = (e: any) => {
        const departmentss = faculties.find(
            (f: any) => f.faculty === e.target.value
        )?.departments;
        setDepartments(departmentss);
    };

    return user ? (
        <div className="student-container">
            <h1>Edit student details</h1>

            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    console.log({ values, actions });
                      updateUserData(values);
                    //    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
            >
                {({ values,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleSubmit,
                    handleReset,
                    setFieldValue, }) => (
                    <Form>
                        <div className="form-container">
                            <div className="basic-details">
                                <div className="trivial-details">
                                    <label htmlFor="firstName">First Name</label>
                                    <Field id="firstName" name="firstName" placeholder="First Name" />
                                    <label htmlFor="lastName">Last Name</label>
                                    <Field id="lastName" name="lastName" placeholder="Last Name" />
                                    <label htmlFor="studyYear">Study year</label>
                                    <Field
                                        id="studyYear"
                                        name="studyYear"
                                        placeholder="Study year"
                                    />
                                    <label htmlFor="registrationNumber">Registration number</label>
                                    <Field
                                        id="registrationNumber"
                                        name="registrationNumber"
                                        placeholder="Registration number"
                                    />
                                </div>
                                <div className="institutional-details">
                                    <label htmlFor="studyInstitution">Study institution</label>
                                    <Field
                                        // initialValues={values.studyInstitution}
                                        as="select"
                                        id="studyInstitution"
                                        name="studyInstitution"
                                        onChange={(e: any) => {
                                            handleInstitutionChange(e);
                                            handleChange(e);
                                        }}
                                    >
                                        <option value="">Select Institution (Just one)</option>
                                        {institutions?.map(
                                            (institution: Institution, index: number) => (
                                                <option
                                                    key={index}
                                                    value={institution.studyInstitution}
                                                >
                                                    {institution.studyInstitution}
                                                </option>
                                            )
                                        )}
                                    </Field>
                                    <label htmlFor="faculty">Faculty</label>
                                    <Field
                                        // initialValues={values.faculty}
                                        as="select"
                                        id="faculty"
                                        name="faculty"
                                        onChange={(e: any) => {
                                            handleFacultyChange(e);
                                            handleChange(e);
                                        }}
                                    >
                                        <option value="">Select Faculty (Just one)</option>
                                        {faculties?.map((faculty: any, index: number) => (
                                            <option key={index} value={faculty.faculty}>
                                                {faculty.faculty}
                                            </option>
                                        ))}
                                    </Field>
                                    <label htmlFor="department">Department</label>
                                    <Field
                                        // initialValues={values.department}
                                        as="select"
                                        id="department"
                                        name="department"
                                    >
                                        <option value="">Select Department (Just one)</option>
                                        {departments?.map((department: any, index: number) => (
                                            <option key={index} value={department}>
                                                {department}
                                            </option>
                                        ))}
                                    </Field>
                                </div>
                            </div>
                            <div className="role-container">
                                <label htmlFor="role">User role</label>
                                <Field
                                    // initialValues={values.role}
                                    as="select"
                                    id="role"
                                    name="role"
                                    placeholder="Study institution"
                                >
                                    {ROLES?.map((role: any, index: number) => (
                                            <option key={index} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                </Field>
                            </div>
                        </div>
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
        : (
            <span>failed to load discipline. try again later</span>
        );
}

export default Student;
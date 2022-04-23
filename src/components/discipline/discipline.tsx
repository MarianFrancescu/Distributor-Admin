import { Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../../services/service";
import DisciplineInterface from "../../models/discipline.interface";
import "./discipline.scss";
import { Button, FormControlLabel, Switch } from "@mui/material";
import Institution from "../../models/institution.interface";

interface MyFormValues {
  name: string;
  teacher: string;
  studyInstitution: string;
  faculty: string;
  department: string;
  studyYear: string;
  maxNoOfStudentsPerTimetable: number;
  timetable: Array<any>;
}

function Discipline() {
  const [discipline, setDiscipline] = useState<any>();
  const { disciplineID } = useParams();

  const [institutions, setInstitutions] = useState<any>();
  const [faculties, setFaculties] = useState<any>();
  const [departments, setDepartments] = useState<any>();
  const [checked, setChecked] = useState(false);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.checked)
    setChecked(event.target.checked);
  };

  const getDisciplineData = async () => {
    try {
      const response = await service.getDiscipline(disciplineID as string);
      const disciplineResponse = response as DisciplineInterface;
      setDiscipline(disciplineResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const getInstitutionsData = async () => {
    try {
        const response = await service.getInstitutions();
        const institutionsResponse = response as Institution[];
        setInstitutions([...institutionsResponse]);
    } catch (error) {
        console.log(error);
    }
};

  const updateDisciplineData = (discipline: DisciplineInterface) => {
    service.updateDiscipline(disciplineID as string, discipline);
  };

  useEffect(() => {
    getDisciplineData();
    getInstitutionsData();
  }, []);

  const initialValues: MyFormValues = {
    name: discipline?.name ? discipline?.name : '',
    teacher: discipline?.teacher ? discipline?.teacher : '',
    studyInstitution: discipline?.studyInstitution && !checked
      ? discipline?.studyInstitution
      : '',
    faculty: discipline?.faculty && !checked ? discipline?.faculty : '',
    department: discipline?.department && !checked ? discipline?.department : '',
    studyYear: discipline?.studyYear ? discipline?.studyYear : '',
    maxNoOfStudentsPerTimetable: discipline?.maxNoOfStudentsPerTimetable
      ? discipline?.maxNoOfStudentsPerTimetable
      : '',
    timetable: discipline?.timetable ? discipline?.timetable : [],
  };

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

  return discipline ? (
    <div className="discipline-container">
      <h1>Edit Discipline</h1>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          updateDisciplineData(values);
          //    alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        {({
          values,
          dirty,
          isSubmitting,
          handleChange,
          handleSubmit,
          handleReset,
          setFieldValue,
        }) => (
          <Form>
            <div className="form-container">
              <div className="basic-details">
                <div className="trivial-details">
                  <label htmlFor="name">Name</label>
                  <Field className="field" id="name" name="name" placeholder="First Name" />
                  <label htmlFor="teacher">Teacher</label>
                  <Field className="field" id="teacher" name="teacher" placeholder="Teacher" />
                  <label htmlFor="studyYear">Study year</label>
                  <Field
                    className="field"
                    id="studyYear"
                    name="studyYear"
                    placeholder="Study year"
                  />
                  <label htmlFor="maxNoOfStudentsPerTimetable">
                    Max students
                  </label>
                  <Field
                    className="field"
                    id="maxNoOfStudentsPerTimetable"
                    name="maxNoOfStudentsPerTimetable"
                    placeholder="Max students"
                  />
                </div>
                <div className="institutional-details">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={checked}
                        onChange={handleSwitchChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Edit institutional details?"
                  />
                  {!checked ? (
                    <div className="institutions-box">
                      <label htmlFor="studyInstitution">
                        Study institution
                      </label>
                      <Field
                        className="field"
                        disabled={!checked}
                        id="studyInstitution"
                        name="studyInstitution"
                        placeholder="Study institution"
                      />
                      <label htmlFor="faculty">Faculty</label>
                      <Field
                        disabled={!checked}
                        id="faculty"
                        name="faculty"
                        placeholder="Faculty"
                        className="field"
                      />
                      <label htmlFor="department">Department</label>
                      <Field
                        disabled={!checked}
                        id="department"
                        name="department"
                        placeholder="Department"
                        className="field"
                      />
                    </div>
                  ) : (
                    <div className="institutions-box">
                      <label htmlFor="studyInstitution">
                        Study institution
                      </label>
                      <Field
                        // initialValues={values.studyInstitution}
                        as="select"
                        id="studyInstitution"
                        name="studyInstitution"
                        className="field"
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
                        className="field"
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
                        className="field"
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
                  )}
                </div>
              </div>
              <div className="timetable-container">
                <FieldArray
                  name="timetable"
                  render={({ insert, remove, push }) => (
                    <div>
                      {values.timetable.length > 0 &&
                        values.timetable.map((option, index) => (
                          <div className="row" key={index}>
                            <div className="col">
                              <label className="label-box" htmlFor={`timetable.${index}.option`}>
                                Option #{index + 1}
                              </label>
                              <Field
                                className="field"
                                name={`timetable.${index}.option`}
                                placeholder="Option"
                                type="text"
                              />
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
                            {/* <div className="col">
                        <label htmlFor={`timetable.${index}.email`}>Email</label>
                        <Field
                          name={`timetable.${index}.email`}
                          placeholder="jane@acme.com"
                          type="email"
                        />
                          {errors.timetable &&
                          errors.timetable[index] &&
                          errors.timetable[index].email &&
                          touched.timetable &&
                          touched.timetable[index].email && (
                            <div className="field-error">
                              {errors.timetable[index].email}
                            </div>
                          )} 
                      </div> */}
                            
                              <Button
                                color="error"
                                onClick={() => remove(index)}
                              >
                                X
                              </Button>
                          </div>
                        ))}
                      <Button
                        variant="outlined"
                        className="secondary"
                        onClick={() => push({ option: "" })}
                      >
                        Add Option
                      </Button>
                    </div>
                  )}
                />
              </div>
            </div>
            <Button variant="contained" type="submit">SAVE</Button>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <span>failed to load discipline. try again later</span>
  );
}

export default Discipline;

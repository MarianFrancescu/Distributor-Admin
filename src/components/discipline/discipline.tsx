import { Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import service from "../../services/service";
import DisciplineInterface from "../../models/discipline.interface";
import "./discipline.scss";

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

  const getDisciplineData = async () => {
    try {
      const response = await service.getDiscipline(disciplineID as string);
      const disciplineResponse = response as DisciplineInterface;
      setDiscipline(disciplineResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const updateDisciplineData = (discipline: DisciplineInterface) => {
    service.updateDiscipline(disciplineID as string, discipline);
  }

  useEffect(() => {
    getDisciplineData();
  }, []);

  const initialValues: MyFormValues = {
    name: discipline?.name ? discipline?.name : "",
    teacher: discipline?.teacher ? discipline?.teacher : "",
    studyInstitution: discipline?.studyInstitution
      ? discipline?.studyInstitution
      : "",
    faculty: discipline?.faculty ? discipline?.faculty : "",
    department: discipline?.department ? discipline?.department : "",
    studyYear: discipline?.studyYear ? discipline?.studyYear : "",
    maxNoOfStudentsPerTimetable: discipline?.maxNoOfStudentsPerTimetable
      ? discipline?.maxNoOfStudentsPerTimetable
      : "",
    timetable: discipline?.timetable ? discipline?.timetable : [],
  };
  return discipline ? (
    <div className="discipline-container">
      <h1>Edit Discipline</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          updateDisciplineData(values);
          //    alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        {({ values }) => (
          <Form>
            <div className="form-container">
              <div className="basic-details">
                <div className="trivial-details">
                  <label htmlFor="name">Name</label>
                  <Field id="name" name="name" placeholder="First Name" />
                  <label htmlFor="teacher">Teacher</label>
                  <Field id="teacher" name="teacher" placeholder="Teacher" />
                  <label htmlFor="studyYear">Study year</label>
                  <Field
                    id="studyYear"
                    name="studyYear"
                    placeholder="Study year"
                  />
                  <label htmlFor="maxNoOfStudentsPerTimetable">
                    Max students
                  </label>
                  <Field
                    id="maxNoOfStudentsPerTimetable"
                    name="maxNoOfStudentsPerTimetable"
                    placeholder="Max students"
                  />
                </div>
                <div className="institutional-details">
                  <label htmlFor="studyInstitution">Study institution</label>
                  <Field
                    id="studyInstitution"
                    name="studyInstitution"
                    placeholder="Study institution"
                  />
                  <label htmlFor="faculty">Faculty</label>
                  <Field id="faculty" name="faculty" placeholder="Faculty" />
                  <label htmlFor="department">Department</label>
                  <Field
                    id="department"
                    name="department"
                    placeholder="Department"
                  />
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
                              <label htmlFor={`timetable.${index}.option`}>
                                Option #{index + 1}
                              </label>
                              <Field
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
                            <div className="col">
                              <button
                                type="button"
                                className="secondary"
                                onClick={() => remove(index)}
                              >
                                X
                              </button>
                            </div>
                          </div>
                        ))}
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => push({ option: "" })}
                      >
                        Add Option
                      </button>
                    </div>
                  )}
                />
              </div>
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <span>failed to load discipline. try again later</span>
  );
}

export default Discipline;

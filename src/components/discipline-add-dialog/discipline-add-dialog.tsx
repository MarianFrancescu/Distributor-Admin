import {
  Button,
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import { Formik, Form, FieldArray, Field } from "formik";
import React, { useEffect, useState } from "react";
import "./discipline-add-dialog.scss";
import service from "../../services/service";
import Institution from "../../models/institution.interface";
import DeleteIcon from "@mui/icons-material/Delete";
import Discipline from "../../models/discipline.interface";

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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function DisciplineAddDialog({ openModal, closeModal }: any) {
  const [institutions, setInstitutions] = useState<any>([]);

  const [faculties, setFaculties] = useState<any>([]);
  const [departments, setDepartments] = useState<any>([]);

  const getInstitutionsData = async () => {
    try {
      const response = await service.getInstitutions();
      const institutionsResponse = response as Institution[];
      setInstitutions([...institutionsResponse]);
    } catch (error) {
      console.log(error);
    }
  };

  const addDiscipline = (discipline: Discipline) => {
    service.addDisicpline(discipline);
  }

  useEffect(() => {
    getInstitutionsData();
  }, []);

  const handleInstitutionChange = (obj: any) => {
    const facultiess = institutions.find(
      (i: Institution) => i.studyInstitution === obj.target.value
    ).faculties;
    setFaculties(facultiess);
  };

  const handleFacultyChange = (e: any) => {
    const departmentss = faculties.find(
      (f: any) => f.faculty === e.target.value
    )?.departments;
    setDepartments(departmentss);
  };

  const initialValues = {
    name: "",
    teacher: "",
    studyInstitution: "",
    faculty: "",
    department: "",
    studyYear: "",
    maxNoOfStudentsPerTimetable: 0,
    timetable: [],
  };

  return (
    <div>
      <Dialog open={openModal} onClose={closeModal}>
        <DialogTitle>Add Institution</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-field">
            Add new institution to be utilised by admins
          </DialogContentText>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
              addDiscipline(values);
              closeModal();
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
                      <Field
                        className="field"
                        id="name"
                        name="name"
                        placeholder="Discipline Name"
                      />
                      <label htmlFor="teacher">Teacher</label>
                      <Field
                        className="field"
                        id="teacher"
                        name="teacher"
                        placeholder="Teacher"
                      />
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
                      <label htmlFor="studyInstitution">
                        Study institution
                      </label>
                      <Field
                        className="field"
                        as="select"
                        id="studyInstitution"
                        name="studyInstitution"
                        placeholder="Study institution"
                        onChange={(e: any) => {
                          handleInstitutionChange(e);
                          handleChange(e);
                        }}
                      >
                        <option value="">Select Institution (Just one)</option>
                        {institutions.map(
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
                        className="field"
                        as="select"
                        id="faculty"
                        name="faculty"
                        placeholder="Faculty"
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
                        className="field"
                        as="select"
                        id="department"
                        name="department"
                        placeholder="Department"
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
                                <div className="col">
                                  <Button
                                    size="small"
                                    type="button"
                                    color="secondary"
                                    onClick={() => remove(index)}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          <Button
                            size="small"
                            variant="outlined"
                            type="button"
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
                <DialogActions>
                  <Button onClick={closeModal}>Cancel</Button>
                  <Button type="submit">Save</Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DisciplineAddDialog;

import { Button, Modal, Backdrop, Fade, Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { Formik, Form, FieldArray, Field } from "formik";
import React, { useEffect, useState } from "react";
import './discipline-add-dialog.scss';
import service from '../../services/service';
import Institution from "../../models/institution.interface";


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
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function DisciplineAddDialog({ openModal, closeModal }: any) {

  // const [open, setOpen] = React.useState(openModal);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const [institutions, setInstitutions] = useState<any>([]);

  const [institution, setInstitution] = useState(null);
  const [faculty, setFaculty] = useState(null);
  const [department, setDepartment] = useState('');

  const getInstitutionsData = async () => {
    try {
      const response = await service.getInstitutions();
      const institutionsResponse = response as Institution[];
      setInstitutions([...institutionsResponse]);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getInstitutionsData();
  }, []);

  const handleInstitutionChange = (obj: any) => {
    // setCountry(obj);
    // setLangList(obj.languages);
    // setLang(null);
    console.log(obj.target.value)
    setInstitution(obj.target.value);
  };

  const initialValues: MyFormValues = {
    name: "",
    teacher: "",
    studyInstitution: "",
    faculty: "",
    department: "",
    studyYear: "",
    maxNoOfStudentsPerTimetable: "",
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
              console.log({ values, actions });
              closeModal();
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
                      <Field id="name" name="name" placeholder="Discipline Name" />
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
                      <Field as="select"
                        id="studyInstitution"
                        name="studyInstitution"
                        placeholder="Study institution"
                        onChange={handleInstitutionChange}
                      >
                        <option value=''>Select Institution (Just one)</option>
                        {institutions.map((institution: Institution, index: number) => (
                          <option key={index} value={institution.studyInstitution}>{institution.studyInstitution}</option>
                        ))}
                      </Field>
                      <label htmlFor="faculty">Faculty</label>
                      <Field as="select" id="faculty" name="faculty" placeholder="Faculty">
                        <option value=''>Select Faculty (Just one)</option>
                        {institutions.find((i: string) => i === institution)?.faculties.map((faculty: any, index: number)=> (
                          <option key={index} value={faculty.faculty}>{faculty.faculty}</option>
                        ))}
                      </Field>
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
  )
}

export default DisciplineAddDialog;
import {
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import service from "../../services/service";
import "./institution-add-dialog.scss";
import InstitutionInterface from "../../models/institution.interface";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from '@mui/icons-material/AddCircle';
 import * as Yup from 'yup';

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

const ValidationSchema = Yup.object().shape({
   studyInstitution: Yup.string()
     .required('Required')
 });

function InstitutionAddDialog({ openModal, closeModal }: any) {
  const addInstitution = (studyInstitution: InstitutionInterface) => {
    service.addInstitution(
      studyInstitution.studyInstitution,
      studyInstitution.faculties
    );
  };

  const initialValues = {
    studyInstitution: "",
    faculties: [
      {
        faculty: "",
        departments: [],
      },
    ],
  };

  return (
    <div className="institution-fields">
      <Dialog open={openModal} onClose={closeModal}>
        <DialogTitle>Add Institution</DialogTitle>
        <DialogContent>
          <DialogContentText className="text-field">
            Add new institution to be utilised by admins
          </DialogContentText>
          <Formik
            initialValues={initialValues}
            validationSchema={ValidationSchema}
            onSubmit={(values, actions) => {
              addInstitution(values);
              closeModal();
              actions.setSubmitting(false);
            }}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
              } = props;
              return (
                <Form>
                  <div className="fields">
                    <TextField
                      className="text-field"
                      id="studyInstitution"
                      name="studyInstitution"
                      label="Institution"
                      variant="outlined"
                      onChange={handleChange}
                      error={errors.studyInstitution?.length! > 0}
                    />
                    <FieldArray
                      name="faculties"
                      render={({ insert, remove, push }) => (
                        <div>
                          {values.faculties.length > 0 &&
                            values.faculties.map((faculty, index) => (
                              <div className="row__institution" key={index}>
                                <div className="col">
                                  <label htmlFor={`faculties.${index}.faculty`}>
                                    Faculty
                                  </label>
                                  <Field
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
                                </div>
                                <FieldArray
                                  name={`faculties.${index}.departments`}
                                  render={({ insert, remove, push }) => (
                                    <div className="departments-fields">
                                      {values.faculties[index].departments
                                        ?.length > 0 &&
                                        values.faculties[
                                          index
                                        ].departments?.map(
                                          (department, index2) => (
                                            <div
                                              className="row__institution"
                                              key={index2}
                                            >
                                              <div className="col">
                                                <label
                                                  htmlFor={`faculties.${index}.departments`}
                                                >
                                                  Departments
                                                </label>
                                                <Field
                                                  name={`faculties.${index}.departments.${index2}`}
                                                  placeholder="Faculty department"
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
                                            </div>
                                          )
                                        )}
                                      <Button
                                        size="small"
                                        variant="outlined"
                                        type="button"
                                        className="secondary"
                                        onClick={() => push("")}
                                        startIcon={<AddCircleIcon />}
                                      >
                                        Department
                                      </Button>
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
                  <DialogActions>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button variant="contained" type="submit" disabled={!dirty || errors.studyInstitution?.length! > 0}>
                      Save
                    </Button>
                  </DialogActions>
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InstitutionAddDialog;

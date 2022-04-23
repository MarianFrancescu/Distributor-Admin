import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import React from "react";
import service from "../../services/service";
import './institution-delete-dialog.scss';

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
    '@media (max-width: 1200px)': {
        width: 250
    }
  };

function InstitutionDeleteDialog({openModal, closeModal, studyInstitution}: any) {
    const handleDelete = () => {
        service.deleteInstitution(studyInstitution);
      }
  
      return (
          <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModal}
          onClose={closeModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Warning!
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Delete this discipline?
              </Typography>
              <div className="actions-area">
                <Button onClick={closeModal}>Close</Button>
                <Button variant="contained" color="error" onClick={() => {handleDelete(); closeModal()}}>Delete</Button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
      )
}

export default InstitutionDeleteDialog;
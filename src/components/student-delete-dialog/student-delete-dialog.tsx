import { Modal, Backdrop, Fade, Box, Typography, Button } from "@mui/material";
import React from "react";
import service from "../../services/service";

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
  
function StudentDeleteDialog({openModal, closeModal, userID}: any) {
    const handleDelete = () => {
        service.deleteUser(userID);
        closeModal();
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
                Delete this student?
              </Typography>
              <Button onClick={closeModal}>Close</Button>
              <Button onClick={handleDelete}>Delete</Button>
            </Box>
          </Fade>
        </Modal>
      </div>
      )
}

export default StudentDeleteDialog;
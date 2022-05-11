import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import React from "react";
import service from "../../services/service";
import './institution-delete-dialog.scss';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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

function InstitutionDeleteDialog({ openModal, closeModal, studyInstitution }: any) {
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

  const handleDelete = () => {
    service.deleteInstitution(studyInstitution).then(() => { handleClick(); window.location.reload();});
  }

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
          Deleted institution successfully
        </Alert>
      </Snackbar>
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
              <Button variant="contained" color="error" onClick={() => { handleDelete(); closeModal() }}>Delete</Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default InstitutionDeleteDialog;
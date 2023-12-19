import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ApartmentModal = ({ open, handleClose, colors }) => {
  const residents = [
    { label: "The Shawshank Redemption" },
    { label: "The Godfather" },
    { label: "The Godfather: Part II" },
    { label: "The Dark Knight" },
    { label: "12 Angry Men" },
    { label: "Schindler's List" },
    { label: "Pulp Fiction" },
    { label: "The Lord of the Rings: The Return of the King" },
    { label: "The Good, the Bad and the Ugly" },
    { label: "Fight Club" },
    { label: "The Lord of the Rings: The Fellowship of the Ring" },
  ];
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Add Apartment
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": "span 4",
            marginTop: 4,
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Apartment Number"
            //   onBlur={handleBlur}
            //   onChange={handleChange}
            //   value={values.apartmentNumber}
            name="apartmentNumber"
            // error={!!touched.apartmentNumber && !!errors.apartmentNumber}
            // helperText={touched.apartmentNumber && errors.apartmentNumber}
            sx={{ gridColumn: "span 16" }}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={residents}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Resident"
                variant="filled"
                // onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.currentResident}
                name="currentResident"
                // error={!!touched.currentResident && !!errors.currentResident}
                // helperText={touched.currentResident && errors.currentResident}
              />
            )}
            sx={{ gridColumn: "span 16" }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleClose}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          create
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

ApartmentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  colors: PropTypes.object.isRequired,
};

export default ApartmentModal;

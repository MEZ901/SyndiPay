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
import { useFormik } from "formik";
import addApartmentSchema from "../schemas/addApartmentSchema";
import { useGetAllResidentsQuery } from "../../residents/redux/residentApiSlice";
import { useCreateApartmentMutation } from "../redux/apartmentApiSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ApartmentModal = ({ open, handleClose, colors, refetch }) => {
  const { data: residentsData, isLoading } = useGetAllResidentsQuery();
  const [createApartment] = useCreateApartmentMutation();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    setValues,
  } = useFormik({
    initialValues: {
      apartmentNumber: "",
      currentResident: null,
    },
    validationSchema: addApartmentSchema,
    onSubmit: async (data) => {
      try {
        await createApartment(data);
        await refetch();
        handleClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <form onSubmit={handleSubmit}>
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
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Apartment Number"
                  name="apartmentNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.apartmentNumber}
                  error={!!touched.apartmentNumber && !!errors.apartmentNumber}
                  helperText={touched.apartmentNumber && errors.apartmentNumber}
                  sx={{ gridColumn: "span 16" }}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={residentsData}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) =>
                    setValues({
                      ...values,
                      currentResident: value?._id || null,
                    })
                  }
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Resident"
                      variant="filled"
                      name="currentResident"
                      error={
                        !!touched.currentResident && !!errors.currentResident
                      }
                      helperText={
                        touched.currentResident && errors.currentResident
                      }
                    />
                  )}
                  sx={{ gridColumn: "span 16" }}
                />
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            type="submit"
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
      </form>
    </BootstrapDialog>
  );
};

ApartmentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  colors: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default ApartmentModal;

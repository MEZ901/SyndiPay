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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useFormik } from "formik";
import addResidentSchema from "../schemas/AddResidentSchema";
import {
  useCreateResidentMutation,
  useUpdateResidentMutation,
} from "../redux/residentApiSlice";
import { useEffect } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const ResidentModal = ({
  open,
  handleClose,
  colors,
  refetch,
  residentData,
}) => {
  const [createResident] = useCreateResidentMutation();
  const [updateResident] = useUpdateResidentMutation();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: {
      name: residentData?.name || "",
      contactInfo: residentData?.contactInfo || "",
      isOwner: residentData?.isOwner || false,
    },
    validationSchema: addResidentSchema,
    onSubmit: async (data) => {
      try {
        if (residentData) {
          await updateResident({
            id: residentData.id,
            body: data,
          });
        } else {
          await createResident(data);
        }
        await refetch();
        resetForm();
        handleClose();
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (residentData) {
      setValues({
        name: residentData.name,
        contactInfo:
          residentData.contactInfo == "N/A" ? "" : residentData.contactInfo,
        isOwner: residentData.isOwner,
      });
    }
  }, [residentData, setValues]);
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {residentData ? "Edit Resident" : "Add Resident"}
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
              label="Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={!!touched.name && !!errors.name}
              helperText={touched.name && errors.name}
              sx={{ gridColumn: "span 16" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Contact Info"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.contactInfo}
              name="contactInfo"
              error={!!touched.contactInfo && !!errors.contactInfo}
              helperText={touched.contactInfo && errors.contactInfo}
              sx={{ gridColumn: "span 16" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.isOwner}
                  onChange={(e) =>
                    setValues({ ...values, isOwner: e.target.checked })
                  }
                />
              }
              label="This resident owns the apartment"
              sx={{ gridColumn: "span 16" }}
            />
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
            {residentData ? "Edit" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
};

ResidentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  colors: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
  residentData: PropTypes.object,
};

export default ResidentModal;

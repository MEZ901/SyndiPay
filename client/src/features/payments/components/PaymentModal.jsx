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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FilledInput from "@mui/material/FilledInput";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import addPaymentSchema from "../schemas/addPaymentSchema";
import FormHelperText from "@mui/material/FormHelperText";
import { useFormik } from "formik";
import { useGetAllApartmentsQuery } from "../../apartments/redux/apartmentApiSlice";
import { useGetAllResidentsQuery } from "../../residents/redux/residentApiSlice";
import {
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
} from "../redux/paymentApiSlice";
import { useEffect } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const PaymentModal = ({ open, handleClose, colors, refetch, paymentData }) => {
  const { data: apartments } = useGetAllApartmentsQuery();
  const { data: residents } = useGetAllResidentsQuery();

  const [createPayment] = useCreatePaymentMutation();
  const [updatePayment] = useUpdatePaymentMutation();

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
      apartment: null,
      resident: null,
      amount: null,
      paymentDate: null,
      paymentDuration: null,
      paymentMethod: null,
    },
    validationSchema: addPaymentSchema,
    onSubmit: async (data) => {
      try {
        if (paymentData) {
          await updatePayment({
            id: paymentData.id,
            body: data,
          });
        } else {
          await createPayment(data);
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
    if (paymentData) {
      setValues({
        apartment: paymentData.apartment,
        resident: paymentData.resident,
        amount: paymentData.amount,
        paymentDate: paymentData.date,
        paymentDuration: paymentData.paymentDuration,
        paymentMethod: paymentData.paymentMethod,
      });
    }
  }, [paymentData, setValues]);

  const paymentDurations = [
    { label: "1 month" },
    { label: "3 months" },
    { label: "6 months" },
    { label: "1 year" },
  ];

  const paymentMethod = [
    { label: "cash" },
    { label: "check" },
    { label: "bankTransfer" },
  ];
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {paymentData ? "Edit Payment" : "Add Payment"}
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
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={apartments}
              getOptionLabel={(option) => option.apartmentNumber}
              onChange={(event, newValue) =>
                setValues({ ...values, apartment: newValue?._id || null })
              }
              value={
                apartments?.find(
                  (apartment) => apartment._id === values.apartment
                ) || null
              }
              isOptionEqualToValue={(option, value) =>
                option.apartmentNumber === value.apartmentNumber
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Apartment"
                  variant="filled"
                  name="apartment"
                  error={!!touched.apartment && !!errors.apartment}
                  helperText={touched.apartment && errors.apartment}
                />
              )}
              sx={{ gridColumn: "span 16" }}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={residents}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) =>
                setValues({ ...values, resident: newValue?._id || null })
              }
              value={
                residents?.find(
                  (resident) => resident._id === values.resident
                ) || null
              }
              isOptionEqualToValue={(option, value) =>
                option.name === value.name
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Resident"
                  variant="filled"
                  name="resident"
                  error={!!touched.resident && !!errors.resident}
                  helperText={touched.resident && errors.resident}
                />
              )}
              sx={{ gridColumn: "span 16" }}
            />
            <FormControl
              fullWidth
              sx={{ gridColumn: "span 16" }}
              variant="filled"
            >
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <FilledInput
                id="outlined-adornment-amount"
                endAdornment={
                  <InputAdornment position="end">DH</InputAdornment>
                }
                label="Amount"
                name="amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                error={!!touched.amount && !!errors.amount}
              />
              <FormHelperText id="outlined-weight-helper-text">
                {touched.amount && errors.amount}
              </FormHelperText>
            </FormControl>

            <Accordion
              sx={{
                gridColumn: "span 16",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Advanced (optional)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": "span 4",
                    gridColumn: "span 16",
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Payment Date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.paymentDate}
                    name="paymentDate"
                    error={!!touched.paymentDate && !!errors.paymentDate}
                    helperText={touched.paymentDate && errors.paymentDate}
                    sx={{ gridColumn: "span 16" }}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={paymentDurations}
                    onChange={(event, value) =>
                      setValues({
                        ...values,
                        paymentDuration: value?.label || null,
                      })
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.label === value.label
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Payment Duration"
                        variant="filled"
                        name="paymentDuration"
                        error={
                          !!touched.paymentDuration && !!errors.paymentDuration
                        }
                        helperText={
                          touched.paymentDuration && errors.paymentDuration
                        }
                      />
                    )}
                    sx={{ gridColumn: "span 16" }}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={paymentMethod}
                    onChange={(event, value) =>
                      setValues({
                        ...values,
                        paymentMethod: value?.label || null,
                      })
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.label === value.label
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Payment Method"
                        variant="filled"
                        name="paymentMethod"
                        error={
                          !!touched.paymentMethod && !!errors.paymentMethod
                        }
                        helperText={
                          touched.paymentMethod && errors.paymentMethod
                        }
                      />
                    )}
                    sx={{ gridColumn: "span 16" }}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
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
            {paymentData ? "Edit" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
};

PaymentModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  colors: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
  paymentData: PropTypes.object,
};

export default PaymentModal;

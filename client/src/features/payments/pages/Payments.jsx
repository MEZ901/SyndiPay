import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import PaymentModal from "../components/PaymentModal";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReceiptIcon from "@mui/icons-material/Receipt";
import {
  useGetAllPaymentsQuery,
  useDeletePaymentMutation,
} from "../redux/paymentApiSlice";
import PaymentDocument from "../components/PaymentDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";

const Payments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openModal, setOpenModal] = useState(false);
  const [operationMode, setOperationMode] = useState("add");
  const [paymentData, setPaymentData] = useState(null);

  const { data, isLoading, refetch } = useGetAllPaymentsQuery();
  const [deletePayment] = useDeletePaymentMutation();

  const handleClickOpenModal = () => {
    setOperationMode("add");
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeletePayment = async (id) => {
    await deletePayment(id);
    refetch();
  };

  const handleEditPayment = (row) => {
    setOperationMode("edit");
    setPaymentData(row);
    setOpenModal(true);
  };

  const payments = data?.map((payment) => ({
    id: payment._id,
    apartment: payment.apartment,
    resident: payment.resident,
    amount: payment.amount,
    date: payment.paymentDate,
    paymentDuration: payment.paymentDuration,
    paymentMethod: payment.paymentMethod,
  }));

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "apartment",
      headerName: "Apartment",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "resident",
      headerName: "Resident",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.amount}DH
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "paymentDuration",
      headerName: "Payment Duration",
      flex: 1,
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (e) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <IconButton
              aria-label="Edit"
              onClick={() => handleEditPayment(e.row)}
            >
              <ModeEditIcon />
            </IconButton>
            <IconButton
              aria-label="Delete"
              onClick={() => handleDeletePayment(e.row.id)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="Invoice">
              <PDFDownloadLink
                document={<PaymentDocument payment={e.row} />}
                fileName={`payment-${e.row.id}.pdf`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {({ loading }) =>
                  loading ? "Loading document..." : <ReceiptIcon />
                }
              </PDFDownloadLink>
            </IconButton>
          </Box>
        );
      },
    },
  ];

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box m="20px">
      <Header
        title="PAYMENTS"
        subtitle="Manage your payments here"
        buttonElement={{
          icon: <AddCircleIcon sx={{ mr: "10px" }} />,
          text: "Add Apartment",
          onClick: handleClickOpenModal,
        }}
      />

      <PaymentModal
        open={openModal}
        handleClose={handleCloseModal}
        colors={colors}
        refetch={refetch}
        paymentData={operationMode === "edit" ? paymentData : null}
      />

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={payments} columns={columns} />
      </Box>
    </Box>
  );
};

export default Payments;

import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataInvoices } from "../../../data/mockData";
import Header from "../../../components/Header";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Payments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
          ${params.row.amount}
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
  ];

  return (
    <Box m="20px">
      <Header
        title="PAYMENTS"
        subtitle="Manage your payments here"
        buttonElement={{
          icon: <AddCircleIcon sx={{ mr: "10px" }} />,
          text: "Add Apartment",
        }}
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
        <DataGrid rows={mockDataInvoices} columns={columns} />
      </Box>
    </Box>
  );
};

export default Payments;

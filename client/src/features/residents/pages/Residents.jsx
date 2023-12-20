import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import ResidentModal from "../components/ResidentModal";
import {
  useGetAllResidentsQuery,
  useDeleteResidentMutation,
} from "../redux/residentApiSlice";

const Residents = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openModal, setOpenModal] = useState(false);
  const [operationMode, setOperationMode] = useState("add");
  const [residentData, setResidentData] = useState(null);

  const { data, isLoading, refetch } = useGetAllResidentsQuery();
  const [deleteResident] = useDeleteResidentMutation();

  const residents = data?.map((resident) => ({
    id: resident._id,
    name: resident.name,
    contactInfo: resident.contactInfo ? resident.contactInfo : "N/A",
    apartmentNumber: resident.apartment ? resident.apartment : "N/A",
    status: resident.apartment ? "currently resides" : "No longer resides",
    isOwner: resident.isOwner,
  }));

  const handleClickOpenModal = () => {
    setOperationMode("add");
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeleteResident = async (id) => {
    await deleteResident(id);
    refetch();
  };

  const handleEditResident = (row) => {
    setOperationMode("edit");
    setResidentData(row);
    setOpenModal(true);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "contactInfo",
      headerName: "Contact Info",
      flex: 1,
    },
    {
      field: "apartmentNumber",
      headerName: "Apartment Number",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              color:
                params.value === "currently resides"
                  ? colors.greenAccent[300]
                  : colors.redAccent[300],
            }}
          >
            {params.value}
          </Typography>
        );
      },
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
              onClick={() => handleEditResident(e.row)}
            >
              <ModeEditIcon />
            </IconButton>

            <IconButton
              aria-label="Delet"
              onClick={() => handleDeleteResident(e.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box m="20px">
      <Header
        title="RESIDENTS"
        subtitle="Manage your residents here"
        buttonElement={{
          icon: <AddCircleIcon sx={{ mr: "10px" }} />,
          text: "Add Resident",
          onClick: handleClickOpenModal,
        }}
      />

      <ResidentModal
        open={openModal}
        handleClose={handleCloseModal}
        colors={colors}
        refetch={refetch}
        residentData={operationMode === "edit" ? residentData : null}
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
        <DataGrid rows={residents} columns={columns} />
      </Box>
    </Box>
  );
};

export default Residents;

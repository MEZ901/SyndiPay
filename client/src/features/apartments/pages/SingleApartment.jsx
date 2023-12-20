import { Box, useTheme, Button } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetApartmentByIdQuery,
  useDeleteApartmentMutation,
} from "../redux/apartmentApiSlice";
import { useState } from "react";
import ApartmentModal from "../components/ApartmentModal";

const SingleApartment = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();

  const { data, isLoading, refetch } = useGetApartmentByIdQuery(id);
  const [deleteApartment] = useDeleteApartmentMutation();

  const handleDeleteApartment = async () => {
    await deleteApartment(id);
    navigate("/apartments");
  };

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box m="20px">
      {/* HEADER */}
      <Header
        title={data?.apartmentNumber}
        subtitle="Manage your apartment here"
      />

      <ApartmentModal
        open={openModal}
        handleClose={handleCloseModal}
        colors={colors}
        refetch={refetch}
        apartmentData={data}
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
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
          height: "100%",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.greenAccent[200],
              padding: "1rem",
              borderRadius: "5px",
              marginBottom: "1rem",
              width: "100%",
            }}
          >
            <h2>Current Resident</h2>
            {data?.currentResident ? (
              <div>
                <h3>Name: {data?.currentResident?.name}</h3>
                <h3>
                  Contact Info: {data?.currentResident?.contactInfo || "---"}
                </h3>
                <h3>isOwner: {data?.currentResident?.isOwner || "false"}</h3>
              </div>
            ) : (
              <div>No current resident</div>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.greenAccent[200],
              padding: "1rem",
              borderRadius: "5px",
              marginBottom: "1rem",
              width: "100%",
            }}
          >
            <h2>Previous Residents</h2>
            {data?.previousResidents?.length > 0 ? (
              data?.previousResidents?.map((resident) => (
                <div key={resident._id}>
                  <h3>Name: {resident.name}</h3>
                  <h3>Contact Info: {resident.contactInfo || "---"}</h3>
                  <h3>isOwner: {resident.isOwner || "false"}</h3>
                </div>
              ))
            ) : (
              <div>No previous residents</div>
            )}
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.greenAccent[200],
              padding: "1rem",
              borderRadius: "5px",
              marginBottom: "1rem",
            }}
          >
            <h2>Payments</h2>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleClickOpenModal}
          >
            Edit
          </Button>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={handleDeleteApartment}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SingleApartment;

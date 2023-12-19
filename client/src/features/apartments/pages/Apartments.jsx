import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import ApartmentCard from "../components/ApartmentCard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ApartmentModal from "../components/ApartmentModal";
import { useState } from "react";

const Apartments = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [openModal, setOpenModal] = useState(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const apartments = [
    {
      id: 1,
      apartmentNumber: "L101",
    },
    {
      id: 2,
      apartmentNumber: "L102",
    },
    {
      id: 3,
      apartmentNumber: "L103",
    },
    {
      id: 4,
      apartmentNumber: "L104",
    },
    {
      id: 5,
      apartmentNumber: "L105",
    },
  ];

  return (
    <Box m="20px">
      {/* HEADER */}
      <Header
        title="APARTMENTS"
        subtitle="Manage your apartments here"
        buttonElement={{
          icon: <AddCircleIcon sx={{ mr: "10px" }} />,
          text: "Add Apartment",
          onClick: handleClickOpenModal,
        }}
      />

      <ApartmentModal
        open={openModal}
        handleClose={handleCloseModal}
        colors={colors}
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
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
          height: "100%",
        }}
      >
        {apartments.map((apartment) => (
          <ApartmentCard
            key={apartment.id}
            apartmentNumber={apartment.apartmentNumber}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Apartments;

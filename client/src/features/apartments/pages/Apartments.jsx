import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import ApartmentCard from "../components/ApartmentCard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ApartmentModal from "../components/ApartmentModal";
import { useEffect, useState } from "react";
import { useGetAllApartmentsQuery } from "../redux/apartmentApiSlice";

const Apartments = () => {
  const [openModal, setOpenModal] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data, error, isLoading, refetch } = useGetAllApartmentsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    console.log(error);
    return <div>waaa</div>;
  }

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
        refetch={refetch}
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
        {data.map((apartment) => (
          <ApartmentCard
            key={apartment._id}
            apartmentNumber={apartment.apartmentNumber}
            apartment={apartment}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Apartments;

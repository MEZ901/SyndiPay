import { Box, useTheme, Button } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetApartmentByIdQuery,
  useDeleteApartmentMutation,
} from "../redux/apartmentApiSlice";

const SingleApartment = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();

  const { data, isLoading } = useGetApartmentByIdQuery(id);
  const [deleteApartment] = useDeleteApartmentMutation();

  const handleDeleteApartment = async () => {
    await deleteApartment(id);
    navigate("/apartments");
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box m="20px">
      {/* HEADER */}
      <Header
        title={data?.apartmentNumber}
        subtitle="Manage your apartment here"
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
            // onClick={buttonElement?.onClick}
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

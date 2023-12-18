import { Typography, Box, Button, useTheme } from "@mui/material";
import { tokens } from "../theme";
import PropTypes from "prop-types";

const Header = ({ title, subtitle, buttonElement = null }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      mb="30px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          {title}
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
          {subtitle}
        </Typography>
      </Box>

      {buttonElement && (
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            {buttonElement.icon}
            {buttonElement.text}
          </Button>
        </Box>
      )}
    </Box>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  buttonElement: PropTypes.object,
};

export default Header;

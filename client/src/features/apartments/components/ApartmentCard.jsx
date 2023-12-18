import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import apartment from "../../../assets/images/apartment.png";
import PropTypes from "prop-types";

const ApartmentCard = ({ apartmentNumber }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={apartment}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {apartmentNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Some dummy text to fill the card content with: Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Quisquam, voluptatum.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

ApartmentCard.propTypes = {
  apartmentNumber: PropTypes.string.isRequired,
};

export default ApartmentCard;

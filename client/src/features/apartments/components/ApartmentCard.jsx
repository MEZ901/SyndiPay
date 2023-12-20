import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import apartmentImg from "../../../assets/images/apartment.png";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ApartmentCard = ({ apartment }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => navigate(`/apartments/${apartment._id}`)}>
        <CardMedia
          component="img"
          height="140"
          image={apartmentImg}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {apartment.apartmentNumber}
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
  apartment: PropTypes.object.isRequired,
};

export default ApartmentCard;

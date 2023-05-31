import { Box, IconButton } from "@mui/material";
import logoImage from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const LeftNav = () => {
  const navigation = useNavigate();

  return (
    <Box className="leftNav" sx={{flexGrow: 1}}>
      <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => navigation("/")}>
        <img className="company-logo" src={logoImage} alt="Logo"/>
      </IconButton>
    </Box>
  );
};

export default LeftNav;

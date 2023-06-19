import { Box, Card, Typography } from "@mui/material";
import AboutUsImg from "../../assets/aboutus-woman.jpg";

const AboutUs: React.FC = () => {

    return (
        <Card className="about">
            <Card className="wrapper">
                <Card className="leftbox">
                    <Typography className="upper-row">
                        Acacia is a place of dream, for dreamers. There is no such things as a barrier for our dreams.
                    </Typography>
                    <Typography className="lower-row" sx={{ whiteSpace: 'pre-line' }}>
                        From clothings to electronics, from teenager fashion to elderly needs, we have them all. Join us now for a wonderful selection of goods that you can buy today.
                        {"\n\n"}
                        Are you feel eager to please? 
                        {'\n\n'}
                        Or desperate for approval? 
                    </Typography>
                </Card>
                <Card className="rightbox">
                    <img src={AboutUsImg} alt="About Us"></img>
                </Card>

            </Card>
        </Card>
    )
}

export default AboutUs;
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Chip} from "@mui/material";
import Link from "next/link";
import Button from "@mui/material/Button";

const NotificationCard = ({notification}) => {
  return (
    <Grid item lg={8} xs={12}>
      <Card variant={"outlined"}>
        <Box p={2}>
          <Typography variant={"h4"}>title</Typography>
          <Typography mb={1} variant={"body1"}>description</Typography>
          <Typography variant={"subtitle1"} mr={1}>1999-09-09</Typography>
        </Box>
      </Card>
    </Grid>
  );
}
export default NotificationCard;

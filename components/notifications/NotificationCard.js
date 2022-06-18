import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Chip} from "@mui/material";
import Link from "next/link";
import Button from "@mui/material/Button";
import moment from "moment";

const NotificationCard = ({notification}) => {
  return (
    <Grid item lg={8} xs={12}>
      <Card variant={"outlined"}>
        <Box p={2}>
          <Typography variant={"h4"}>{moment(notification.created_at).format("MM-DD-YYYY hh:mmA")}</Typography>
          <Typography mb={1} variant={"body1"}>{notification.message}</Typography>
        </Box>
      </Card>
    </Grid>
  );
}
export default NotificationCard;

import Grid from "@mui/material/Grid";
import NotificationCard from "../../components/notifications/NotificationCard";
import Typography from "@mui/material/Typography";

const Notifications = () => {
  const notifications = Array(20).fill(0);
  return (
    <Grid container justifyContent={'center'} py={3} spacing={2}>
      <Grid item xs={12}>
        <Typography align={"center"} variant={"h3"} mb={2}>Your Notifications</Typography>
      </Grid>
      {notifications.map(notification => <NotificationCard notifications={notification} />)}
    </Grid>
  )
}
export default Notifications;

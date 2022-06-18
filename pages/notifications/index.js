import Grid from "@mui/material/Grid";
import NotificationCard from "../../components/notifications/NotificationCard";
import Typography from "@mui/material/Typography";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import api from "../../config/api";
import Loader from "../../components/Loader";

const Notifications = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    toast.info("Fetching notifications");
    api(`/notification/list`).then(response => {
      setNotifications(response);
      setIsLoading(false);
      toast.success("Fetched successfully");
    });
  }, []);
  if (isLoading) {
    return <Loader/>
  }
  return (
    <Grid container justifyContent={'center'} py={3} spacing={2}>
      <Grid item xs={12}>
        <Typography align={"center"} variant={"h3"} mb={2}>Your Notifications</Typography>
      </Grid>
      {notifications.map(notification => <NotificationCard key={notification.id} notification={notification} />)}
    </Grid>
  )
}
export default Notifications;

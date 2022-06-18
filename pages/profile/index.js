import Box from "@mui/material/Box";
import CloseIcon from '@mui/icons-material/Close';
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import api from "../../config/api";
import Loader from "../../components/Loader";
import CheckIcon from '@mui/icons-material/Check';
import Grid from "@mui/material/Grid";
import Link from "next/link";
import Button from "@mui/material/Button";
import {Chip} from "@mui/material";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    toast.info("Fetching profile");
    api(`/api/v1/account/profile`).then(response => {
      setUserDetails(response);
      setIsLoading(false);
      toast.success("Fetched successfully");
    });
  }, []);
  if (isLoading) {
    return <Loader/>
  }
  return (
    <Box py={3} display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <Grid container spacing={2} xs={10} lg={8} mb={3}>
        <Grid item xs={6} variant={"body1"}>Username:</Grid>
        <Grid item xs={6}>{userDetails.username}</Grid>
        <Grid item xs={6} variant={"body1"}>Email:</Grid>
        <Grid item xs={6}>{userDetails.email}</Grid>
        <Grid item xs={6} variant={"body1"}>Type:</Grid>
        <Grid item xs={6}>{userDetails.type}</Grid>
        <Grid item xs={6} variant={"body1"}>Email Notifications:</Grid>
        <Grid item xs={6}>{userDetails.allow_mail_notification ?
          <CheckIcon/> : <CloseIcon/>}</Grid>
        <Grid item xs={6} variant={"body1"}>Gender:</Grid>
        <Grid item xs={6}>{userDetails.gender === 'f' ? 'Female' : 'Male'}</Grid>
        <Grid item xs={6} variant={"body1"}>Date of Birth:</Grid>
        <Grid item xs={6}>{userDetails.date_of_birth}</Grid>
        {userDetails.type === 'developer' ? (
          <>
            <Grid item xs={6} variant={"body1"}>Tags:</Grid>
            <Grid item xs={6}>{userDetails.tags.map((tag) => <Chip label={tag.name} key={tag.id}
                                                                   color={"secondary"}/>)}</Grid>
            <Grid item xs={6} variant={"body1"}>CV:</Grid>
            <Grid item xs={6}>{userDetails.cv}</Grid>
          </>
        ) : (
          <>
            <Grid item xs={6} variant={"body1"}>Address:</Grid>
            <Grid item xs={6}>{userDetails.address}</Grid>
            <Grid item xs={6} variant={"body1"}>History:</Grid>
            <Grid item xs={6}>{userDetails.history}</Grid>
          </>
        )}
      </Grid>
      <Link href={"/profile/edit"}>
        <Button color={"secondary"} variant={"contained"}>Edit</Button>
      </Link>
    </Box>
  )
}
export default Profile;

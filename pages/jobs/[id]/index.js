import {useRouter} from "next/router";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Alert, Chip} from "@mui/material";
import Link from "next/link";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import CardMedia from "@mui/material/CardMedia";
import {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import api from "../../../config/api";
import moment from "moment";
import Loader from "../../../components/Loader";
import {AppContext} from "../../_app";
import {apiUrl} from "../../../config/constants";

const JobDetails = () => {
  const {query} = useRouter();
  const {id} = query;
  const [isLoading, setIsLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState({});
  const {userRole, userId} = useContext(AppContext);
  const fetchJobDetails = () => {
    toast.info("Fetching job details");
    api(`/job/detail/${id}`).then(response => {
      setJobDetails(response);
      setIsLoading(false);
      toast.success("Fetched successfully");
    });
  }
  useEffect(() => {
    if (id) {
      fetchJobDetails();
    }
  }, [id]);
  const apply = async () => {
    setIsLoading(true);
    toast.info("Applying...");
    api(`/job/apply/${id}`).then((res) => {
      if (res?.detail) {
        toast.error(res.detail)
      } else {
        setJobDetails(previous => ({...previous, applied_developer: [...previous.applied_developer, {id: userId}]}))
        toast.success("Success.");
      }
      setIsLoading(false);
    }).catch(err => {
      toast.error(err?.message || 'Error');
    });
  }
  const assign = async (developerId) => {
    setIsLoading(true);
    toast.info("Assigning...");
    api(`/job/assign/${id}/${developerId}`).then(() => {
      toast.success("Success.");
      fetchJobDetails();
    });
  }
  if (isLoading) {
    return <Loader/>
  }
  return (
    <Grid container justifyContent={"center"} py={3}>
      <Grid item lg={8} xs={12} mb={2}>
        <Card variant={"outlined"}>
          <CardMedia
            component="img"
            height="300"
            image={`${apiUrl}${jobDetails.banner_image}`}
            alt="Job image"
          />
          <Box p={2}>
            <Typography variant={"h4"}>{jobDetails.name}</Typography>
            <Typography mb={1} variant={"body1"}>{jobDetails.description}</Typography>
            <Box mb={1} flexDirection={"row"} display={"flex"}>
              <Typography variant={"subtitle1"} mr={1}>Tags:</Typography>
              {(jobDetails?.Tags || []).map(tag => <Chip label={tag.name} key={tag.id} variant={"filled"}
                                                         color={"secondary"}/>)}
            </Box>

            <Typography mb={1} variant={"subtitle2"}>Created
              At: {moment(jobDetails.creation_time).format("MM/DD/YYYY hh:mmA")}</Typography>

            <Typography mb={1} variant={"subtitle2"}>Updated
              At: {moment(jobDetails.update_time).format("MM/DD/YYYY hh:mmA")}</Typography>
            <Typography mb={1} variant={"subtitle2"}>Created By: {jobDetails.created_by.username}</Typography>
            <Typography mb={1} variant={"subtitle2"}>Number of
              applicants: {(jobDetails?.applied_developer || []).length}</Typography>
            <Typography mb={1} variant={"subtitle2"}>Status: {jobDetails.status}</Typography>
            {userRole === 'developer' ? (
              jobDetails.applied_developer.find(({id}) => id === userId) ? (
                <Alert severity={"success"}>
                  {jobDetails?.accepted_developer?.id === userId ? 'Approved' : 'Applied'}
                </Alert>
              ) : (
                <Button variant={"contained"} onClick={apply}>Apply <EditIcon/> </Button>
              )
            ) : (userId === jobDetails?.created_by?.id ?
                <Link href={`${id}/edit`}>
                  <Button variant={"contained"}>Edit <EditIcon/> </Button>
                </Link>
                : null
            )}
          </Box>
        </Card>
      </Grid>
      {userRole === 'recruiter' && userId === jobDetails?.created_by?.id && !jobDetails.accepted_developer ? (
        <Grid item lg={8} xs={12}>
          {jobDetails.applied_developer.map(developer => <Card mb={2} variant={"outlined"} key={developer.id}>
            <Box display={"flex"} alignItems={"center"} px={3} justifyContent={"space-evenly"} py={1}>
              <Typography>{developer.username}</Typography>
              <Button onClick={() => assign(developer.id)} variant={"contained"} color={"secondary"}>Assign</Button>
            </Box>
          </Card>)}
        </Grid>
      ) : (jobDetails?.accepted_developer ? (
        <Grid item lg={8} xs={12}>
          <Card variant={"outlined"} key={jobDetails.accepted_developer.id}>
            <Box display={"flex"} alignItems={"center"} px={3} py={1} justifyContent={"space-evenly"}>
              <Typography>Accepted Developer</Typography>
              <Typography variant={"h4"}>{jobDetails.accepted_developer.username}</Typography>
            </Box>
          </Card>
        </Grid>
      ) : null)}
    </Grid>
  )
}
export default JobDetails

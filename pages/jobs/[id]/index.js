import {useRouter} from "next/router";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Chip} from "@mui/material";
import Link from "next/link";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import CardMedia from "@mui/material/CardMedia";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import api from "../../../config/api";
import {apiUrl} from "../../../config/constants";
import moment from "moment";
import Loader from "../../../components/Loader";

const JobDetails = () => {
  const {query} = useRouter();
  const {id} = query;
  const [isLoading, setIsLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState({});
  useEffect( () => {
    toast.info("Fetching job details");
    api(`/job/detail/${id}`).then(response => {
      setJobDetails(response);
      setIsLoading(false);
      toast.success("Fetched successfully");
    });
  }, [id]);
  if (isLoading) {
    return <Loader/>
  }
  return(
    <Grid container justifyContent={"center"} py={3}>
      <Grid item lg={8} xs={12}>
        <Card variant={"outlined"}>
          <CardMedia
            component="img"
            height="300"
            image="https://picsum.photos/200/200"
            alt="Job image"
          />
          <Box p={2}>
            <Typography variant={"h4"}>{jobDetails.name}</Typography>
            <Typography mb={1} variant={"body1"}>{jobDetails.description}</Typography>
            <Box mb={1} flexDirection={"row"} display={"flex"}>
              <Typography variant={"subtitle1"} mr={1}>Tags:</Typography>
              {(jobDetails?.Tags || []).map(tag => <Chip label={tag.name} key={tag.id} variant={"filled"} color={"secondary"} />)}
            </Box>

            <Typography mb={1} variant={"subtitle2"}>Created At: {moment(jobDetails.creation_time).format("MM/DD/YYYY hh:mmA")}</Typography>

            <Typography mb={1} variant={"subtitle2"}>Updated At: {moment(jobDetails.update_time).format("MM/DD/YYYY hh:mmA")}</Typography>
            {/*<Typography mb={1} variant={"subtitle2"}>Created By: </Typography>*/}
            {/*<Typography mb={1} variant={"subtitle2"}>Number of applicants: </Typography>*/}
            <Typography mb={1} variant={"subtitle2"}>Status: {jobDetails.status}</Typography>
            <Button variant={"contained"}>Apply <EditIcon/> </Button>
            <Link href={`${id}/edit`}>
              <Button variant={"contained"}>Edit <EditIcon/> </Button>
            </Link>
          </Box>
        </Card>
      </Grid>
    </Grid>
  )
}
export default JobDetails

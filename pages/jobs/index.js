import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import JobCard from "../../components/jobs/JobCard";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {toast} from "react-toastify";
import Button from "@mui/material/Button";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add'
import {apiUrl} from "../../config/constants";
import api from "../../config/api";
import {CircularProgress} from "@mui/material";
import Loader from "../../components/Loader";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect( () => {
    toast.info("Fetching jobs list");
    api(`/job/list`).then(response => {
      setJobs(response?.jobs || []);
      setIsLoading(false);
      toast.success("Fetched successfully");
    });
  }, []);
  if (isLoading) {
    return <Loader/>
  }
  return (
    <Grid container justifyContent={'center'} py={6} spacing={2}>
      <Grid item mb={2} xs={12} lg={8} display={"flex"} justifyContent={"center"}>
        <Link href={"/jobs/create"}>
          <Button variant={"contained"}>Create A New Job <AddIcon /></Button>
        </Link>
      </Grid>
      <Grid item mb={2} xs={12} lg={8}>
        <Box display={"flex"} justifyContent={"center"}>
          <TextField
            label="Search Jobs"
            fullWidth={true}
            InputProps={{
              type: 'search',
            }}
          />
        </Box>
      </Grid>
      {jobs.map((job, index) => <JobCard key={index} job={job} />)}
    </Grid>
  );
}
export default JobsList;

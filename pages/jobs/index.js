import React, {useContext, useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import JobCard from "../../components/jobs/JobCard";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {toast} from "react-toastify";
import Button from "@mui/material/Button";
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add'
import api from "../../config/api";
import Loader from "../../components/Loader";
import {AppContext} from "../_app";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const {userRole} = useContext(AppContext);
  useEffect(() => {
    toast.info("Fetching jobs list");
    api(`/job/list`).then(response => {
      setJobs((response?.jobs || []).map(job => ({
        ...job,
        tagsFilter: job.Tags.map((tag) => tag.name).join(',').toLowerCase()
      })));
      setIsLoading(false);
      toast.success("Fetched successfully");
    });
  }, []);
  if (isLoading) {
    return <Loader/>
  }
  const filteredJobs = query === '' ? jobs : jobs.filter(job => job.name.toLowerCase().includes(query) || job.tagsFilter.includes(query));
  return (
    <Grid container justifyContent={'center'} py={6} spacing={2}>
      {userRole === 'recruiter' ?
        <Grid item mb={2} xs={12} lg={8} display={"flex"} justifyContent={"center"}>
          <Link href={"/jobs/create"}>
            <Button variant={"contained"}>Create A New Job <AddIcon/></Button>
          </Link>
        </Grid>
        : null}
      <Grid item mb={2} xs={12} lg={8}>
        <Box display={"flex"} justifyContent={"center"}>
          <TextField
            label="Search Jobs"
            fullWidth={true}
            InputProps={{
              type: 'search',
            }}
            value={query}
            onChange={e => setQuery(e.target.value.toLowerCase().trim().replaceAll(',', ''))}
          />
        </Box>
      </Grid>
      {filteredJobs.map((job, index) => <JobCard key={index} job={job}/>)}
    </Grid>
  );
}
export default JobsList;

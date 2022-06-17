import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import JobCard from "../../components/jobs/JobCard";

const JobsList = () => {
  const jobs = Array(20).fill(0);
  return (
    <Grid container justifyContent={'center'} py={12} spacing={2}>
      {jobs.map(job => <JobCard job={job} />)}
    </Grid>
  );
}
export default JobsList;

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import JobCard from "../../components/jobs/JobCard";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const JobsList = () => {
  const jobs = Array(20).fill(0);
  return (
    <Grid container justifyContent={'center'} py={12} spacing={2}>
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
      {jobs.map(job => <JobCard job={job} />)}
    </Grid>
  );
}
export default JobsList;

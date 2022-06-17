import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import moment from "moment";

const JobCard = ({job}) => {
  return (
    <Grid item lg={8} xs={12}>
      <Card variant={"outlined"}>
        <CardMedia
          component="img"
          height="200"
          image="https://picsum.photos/200/200"
          alt="Job image"
        />
        <Box p={2}>
          <Typography variant={"h4"}>{job.name}</Typography>
          <Typography mb={1} variant={"body1"}>{job.description}</Typography>
          <Box mb={1} flexDirection={"row"} display={"flex"}>
            <Typography variant={"subtitle1"} mr={1}>Tags:</Typography>
            {job.Tags.map(tag => <Chip label={tag.name} key={tag.id} variant={"filled"} color={"secondary"} />)}
          </Box>
          <Typography mb={1} variant={"subtitle2"}>Created At: {moment(job.creation_time).format("MM/DD/YYYY hh:mmA")}</Typography>
          <Link href={`/jobs/${job.id}`}><Button variant={"contained"} color={"primary"}>View Details</Button></Link>
        </Box>
      </Card>
    </Grid>
  );
}
export default JobCard;

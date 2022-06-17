import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Chip} from "@mui/material";
import Link from "next/link";
import Button from "@mui/material/Button";

const JobCard = ({job}) => {
  return (
    <Grid item lg={8} xs={12}>
      <Card variant={"outlined"}>
        <Box p={2}>
          <Typography variant={"h4"}>title</Typography>
          <Typography mb={1} variant={"body1"}>description</Typography>
          <Box mb={1} flexDirection={"row"} display={"flex"}>
            <Typography variant={"subtitle1"} mr={1}>Tags:</Typography><Chip label={"react"} variant={"filled"} color={"secondary"} />
          </Box>
          <Link href={"/jobs/1"}><Button variant={"contained"} color={"primary"}>View Details</Button></Link>
        </Box>
      </Card>
    </Grid>
  );
}
export default JobCard;

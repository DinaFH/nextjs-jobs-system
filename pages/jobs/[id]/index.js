import {useRouter} from "next/router";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Chip} from "@mui/material";
import Link from "next/link";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';

const JobDetails = () => {
  const {query} = useRouter();
  const {id} = query;
  return(
    <Grid container justifyContent={"center"} py={3}>
      <Grid item lg={8} xs={12}>
        <Card variant={"outlined"}>
          <Box p={2}>
            <Typography variant={"h4"}>title</Typography>
            <Typography mb={1} variant={"body1"}>description</Typography>
            <Box mb={1} flexDirection={"row"} display={"flex"}>
              <Typography variant={"subtitle1"} mr={1}>Tags:</Typography><Chip label={"react"} variant={"filled"} color={"secondary"} />
            </Box>
            <Typography mb={1} variant={"subtitle2"}>Created At: </Typography>
            <Typography mb={1} variant={"subtitle2"}>Created By: </Typography>
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

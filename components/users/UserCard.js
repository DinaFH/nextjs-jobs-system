import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import moment from "moment";
import {apiUrl} from "../../config/constants";

const UserCard = ({user}) => {
  return (
    <Grid item lg={4} xs={6}>
      <Card variant={"outlined"}>
        <Box p={2}>
          <Typography variant={"h4"}>{user.username}</Typography>
          <Typography mb={1} variant={"body1"}>{user.type}</Typography>
          <Link href={`/users/${user.id}`}><Button variant={"contained"} color={"primary"}>View Profile</Button></Link>
        </Box>
      </Card>
    </Grid>
  );
}
export default UserCard;

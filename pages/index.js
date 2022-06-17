import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
//import Paper from '@mui/material/Paper';
export default function Home() {
  return (
    <Box p={12}>
      <Grid spacing={2} container>
        <Grid item lg={6} xs={12}>
          <div>
            <Typography mb={3} variant={"h1"}>Welcome to our Website</Typography>
            <Typography variant={"body1"} fontSize={20}>Forget the old rules. You can have the best people.Right now. Right here.</Typography>
          </div>
        </Grid>
        <Grid item lg={6} xs={12}>
            <img src="/job2.png" style={{objectFit: 'cover', width: '100%'}}/>
        </Grid>
      </Grid>
    </Box>

  )
}

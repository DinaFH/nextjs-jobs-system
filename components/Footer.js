import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export default function Footer() {
  return (
    <footer style={{
        maxHeight:'300px'
    }
    }> 
  
      <Box
       
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
       
        bgcolor="text.secondary"
        color="white"
      >
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Box borderBottom={1}>Help</Box>
              <Box>
                <Link href="/" color="inherit">
                  Contact
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Support
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Privacy
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Account</Box>
              <Box>
                <Link href="/" color="inherit">
                  Login
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                  Register
                </Link>
              </Box>
            </Grid>
           
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
           Copy Rights &reg; {new Date().getFullYear()}
          </Box>
        </Box>
      </Box>
      
      
    </footer>
  );
}
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} height={400}>
      <CircularProgress />;
    </Box>
  )
}
export default Loader;

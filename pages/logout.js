import {useContext, useEffect} from "react";
import {AppContext} from "./_app";
import Box from "@mui/material/Box";
import {Alert, AlertTitle} from "@mui/material";
import {USER_TOKEN} from "../config/constants";

const Logout = () => {
  const {logout, getLoginData} = useContext(AppContext);
  useEffect(() => {
    localStorage.removeItem(USER_TOKEN);
    logout();
    getLoginData();
  }, []);
  return (
    <Box height={300} display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Logged out
      </Alert>
    </Box>
  )
}
export default Logout;

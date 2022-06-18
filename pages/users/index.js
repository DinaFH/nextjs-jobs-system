import React, {useContext, useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {toast} from "react-toastify";
import api from "../../config/api";
import Loader from "../../components/Loader";
import {AppContext} from "../_app";
import UserCard from "../../components/users/UserCard";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {userId} = useContext(AppContext);
  useEffect(() => {
    toast.info("Fetching users list");
    api(`/api/v1/account/list`).then(response => {
      setUsers(response.filter(({id}) => id !== userId));
      setIsLoading(false);
      toast.success("Fetched successfully");
    });
  }, []);
  if (isLoading) {
    return <Loader/>
  }
  return (
    <Grid container justifyContent={'center'} py={6} spacing={2}>
      {users.map((user, index) => <UserCard key={index} user={user}/>)}
    </Grid>
  );
}
export default UsersList;

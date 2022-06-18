import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import api from "../../config/api";
import Loader from "../../components/Loader";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import {styled} from '@mui/material/styles';
import MenuItem from "@mui/material/MenuItem";
import {FormControl, InputLabel, Select} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";

const Input = styled('input')({
  display: 'none',
});
const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const router = useRouter();
  const handleSelectTags = e => {
    setSelectedTags(e?.target?.value);
  }
  const saveProfile = async () => {
    toast.info("Updating profile");
    setIsLoading(true);
    const {tags, ...data} = {...userDetails}
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    for (let tag of selectedTags) {
      formData.append('tags', tag);
    }
    await api(`/api/v1/account/profile/update`, "PUT", formData)
    setIsLoading(false);
    toast.success("Updated successfully");
    await router.push('/profile');
  }
  useEffect(() => {
    (async () => {
      toast.info("Fetching profile");
      const {cv, ...rest} = await api(`/api/v1/account/profile`)
      const tagsResponse = await api(`/tag/list`)
      setUserDetails(rest);
      setSelectedTags(rest.tags.map(t => t.id));
      setTags(tagsResponse);
      setIsLoading(false);
      toast.success("Fetched successfully");
    })();
  }, []);
  if (isLoading) {
    return <Loader/>
  }
  return (
    <Box py={3} display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <Typography variant={"h4"} mb={2}>Edit Profile</Typography>
      <Grid container spacing={2} xs={10} lg={8} mb={3}>
        <Grid item xs={6} variant={"body1"}>Username:</Grid>
        <Grid item xs={6}>{userDetails.username}</Grid>
        <Grid item xs={6} variant={"body1"}>Email:</Grid>
        <Grid item xs={6}><TextField onChange={e => {
          setUserDetails(previous => ({...previous, email: e.target.value}))
        }} value={userDetails.email}/></Grid>
        <Grid item xs={6} variant={"body1"}>Type:</Grid>
        <Grid item xs={6}>{userDetails.type}</Grid>
        <Grid item xs={6} variant={"body1"}>Email Notifications:</Grid>
        <Grid item xs={6}>
          <Switch
            onChange={e => setUserDetails(prevState => ({...prevState, allow_mail_notification: e.target.checked}))}
            defaultChecked={userDetails.allow_mail_notification}/>
        </Grid>
        <Grid item xs={6} variant={"body1"}>Gender:</Grid><Grid
        item>{userDetails.gender === 'f' ? 'Female' : 'Male'}</Grid>
        <Grid item xs={6} variant={"body1"}>Date of Birth:</Grid>
        <Grid item xs={6}>{userDetails.date_of_birth}</Grid>
        {userDetails.type === 'developer' ? (
          <>
            <Grid item xs={6} variant={"body1"}>Tags:</Grid>
            <Grid item xs={6}>
              <FormControl fullWidth={true}>
                <InputLabel id="tags-name-label">Tags</InputLabel>
                <Select
                  onChange={handleSelectTags}
                  fullWidth={true}
                  labelId="tags-name-label"
                  id="tags-name"
                  multiple
                  variant={"standard"}
                  value={selectedTags}
                  label={"Tags"}>
                  {tags.map((tag) => (
                    <MenuItem
                      key={tag.id}
                      value={tag.id}
                    >
                      {tag.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} variant={"body1"}>CV:</Grid>
            <Grid item xs={6}>
              <label htmlFor="contained-button-file">
                <Input onChange={e => setUserDetails(prevState => ({...prevState, cv: e.target.files[0]}))} accept="application/pdf" id="contained-button-file" type="file"/>
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={6} variant={"body1"}>Address:</Grid><Grid item><TextField
            value={userDetails.address}/></Grid>
            <Grid item xs={6} variant={"body1"}>History:</Grid><Grid item><TextField
            value={userDetails.history}/></Grid>
          </>
        )}
      </Grid>
      <Button color={"primary"} onClick={saveProfile} variant={"contained"}>Save</Button>
    </Box>
  )
}
export default EditProfile;

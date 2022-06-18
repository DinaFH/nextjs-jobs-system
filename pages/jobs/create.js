import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import api from "../../config/api";
import Loader from "../../components/Loader";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {styled} from '@mui/material/styles';
import MenuItem from "@mui/material/MenuItem";
import {FormControl, InputLabel, Select} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";

const Input = styled('input')({
  display: 'none',
});
const CreateJob = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [jobDetails, setJobDetails] = useState({
    status: 'Open',
    applied_developer: [],
  });
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const router = useRouter();
  const handleSelectTags = e => {
    setSelectedTags(e?.target?.value);
  }
  const saveJob = async () => {
    toast.info("Creating job");
    setIsLoading(true);
    const {tags, ...data} = {...jobDetails}
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    formData.append('Tags', selectedTags);
    await api(`/job/create`, "POST", formData)
    setIsLoading(false);
    toast.success("Created successfully");
    await router.push('/jobs');
  }
  useEffect(() => {
    (async () => {
      const tagsResponse = await api(`/tag/list`)
      setTags(tagsResponse);
      setIsLoading(false);
    })();
  }, []);
  if (isLoading) {
    return <Loader/>
  }
  return (
    <Box py={3} display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <Typography variant={"h4"} mb={2}>Create a new job</Typography>
      <Grid container spacing={2} xs={10} lg={8} mb={3}>
        <Grid item xs={6} variant={"body1"}>Name:</Grid>
        <Grid item xs={6}>
          <TextField
            onChange={e => {
              setJobDetails(previous => ({...previous, name: e.target.value}))
            }}
            value={jobDetails.name}/>
        </Grid>
        <Grid item xs={6} variant={"body1"}>Description:</Grid>
        <Grid item xs={6}>
          <TextField
            onChange={e => {
              setJobDetails(previous => ({...previous, description: e.target.value}))
            }}
            value={jobDetails.description}/>
        </Grid>
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
        <Grid item xs={6} variant={"body1"}>Banner Image:</Grid>
        <Grid item xs={6}>
          <label htmlFor="contained-button-file">
            <Input onChange={e => setJobDetails(prevState => ({...prevState, banner_image: e.target.files[0]}))}
                   accept="image/*" id="contained-button-file" type="file"/>
            <Button variant="contained" component="span">
              Upload
            </Button>
          </label>
        </Grid>
      </Grid>
      <Button color={"primary"} onClick={saveJob} variant={"contained"}>Save</Button>
    </Box>
  )
}
export default CreateJob;

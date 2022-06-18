import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {styled} from '@mui/material/styles';
import MenuItem from "@mui/material/MenuItem";
import {FormControl, InputLabel, Select} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";
import api from "../../../config/api";
import Loader from "../../../components/Loader";

const Input = styled('input')({
  display: 'none',
});
const EditJob = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState({});
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const router = useRouter();
  const {query} = router;
  const {id} = query;
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
    await api(`/job/detail/${id}`, "PUT", formData)
    setIsLoading(false);
    toast.success("Updated successfully");
    await router.push(`/jobs/${id}`);
  }
  useEffect(() => {
    (async () => {
      const tagsResponse = await api(`/tag/list`)
      setTags(tagsResponse);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      toast.info("Fetching job details");
      api(`/job/detail/${id}`).then(response => {
        setJobDetails(response);
        setSelectedTags((response?.Tags || []).map(({id}) => id));
        setIsLoading(false);
        toast.success("Fetched successfully");
      });
    })();
  }, [id]);
  if (isLoading) {
    return <Loader/>
  }
  return (
    <Box py={3} display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <Typography variant={"h4"} mb={2}>Edit job</Typography>
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
export default EditJob;

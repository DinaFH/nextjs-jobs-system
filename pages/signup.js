import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import api from "../config/api";
import {toast} from "react-toastify";
import {USER_TOKEN} from "../config/constants";
import {useRouter} from "next/router";

const label = {inputProps: {'aria-label': 'Checkbox demo'}};
const bull = (
  <Box
    component="span"
    sx={{display: 'inline-block', mx: '10px', transform: 'scale(0.8)'}}
  >
    •
  </Box>
);
// <Box
//   component="form"
//   sx={{
//     '& .MuiTextField-root': { m: 1, width: '45ch' },
//   }}
//   noValidate
//   autoComplete="off"
//     />
//     const ITEM_HEIGHT = 48;
//     const ITEM_PADDING_TOP = 8;
//     const MenuProps = {
//       PaperProps: {
//         style: {
//           maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//           width: 250,
//         },
//       },
//     };
//     const names =
//     [  {id:1,value:'Django'},
//       {id:2,value:'React'},
//       {id:3,value:'Angular'},
//      ];
const Signup = () => {
  const [name, setName] = useState("")
  const [password, setPass] = useState("")
  const [confirmPass, setPassConfirm] = useState("")
  const [email, setEmail] = useState("")
  const [type, setType] = useState("developer")
  const [gender, setGender] = useState("m")
  const [cv, setCv] = useState(null)
  const [history, setHistory] = useState("")
  const [address, setAddress] = useState("")
  const [dateofbirth, setDateOfBirth] = useState("")
  const [mailNotification, setMailNotification] = useState(true)
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const router = useRouter();
  const handleSelectTags = e => {
    setSelectedTags(e?.target?.value);
  }

  async function sendData(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', name)
    formData.append('password', password)
    formData.append('password_confirm', confirmPass)
    formData.append('email', email)
    formData.append('type', type)
    formData.append('gender', gender)
    formData.append('allow_mail_notification', mailNotification)
    formData.append('date_of_birth', dateofbirth)
    if (type === 'developer') {
      formData.append('cv', cv)
      for (let tag of selectedTags) {
        formData.append("tags", tag);
      }
    } else {
      formData.append('history', history)
      formData.append('address', address)
    }
    toast.info("Creating your account...");
    await api(`/api/v1/account/${type === 'developer' ? 'signupdeveloper' : 'signuprecruiter'}`, "POST", formData)
    toast.success("Account created successfully");
    toast.warn("You will be able to login after admin activates your account");
    // const response = await api("/api/v1/account/rest_login", "POST", JSON.stringify({
    //   username: name, password
    // }), {
    //   'content-type': 'application/json'
    // });
    // if (response?.token) {
    //   toast.success("Logged in successfully");
    //   localStorage.setItem(USER_TOKEN, response.token);
    //   await router.push('/');
    // } else {
    //   toast.error("Invalid Credentials");
    // }

  }

  useEffect(() => {
    (async () => {
      const tagsResponse = await api(`/tag/list`)
      setTags(tagsResponse);
    })();
  }, []);
  return (
    <div className="container">
      <div className="left">
        <form onSubmit={sendData}>

          <Card sx={{maxWidth: 575}} style={{Height: '60vh'}}>

            <CardContent>
              <center><img className="signupLogo" src="/signup.png"/></center>
              <center><h2 className="signupHeader" color="blue">Sign Up</h2></center>

              <div>
                <TextField required fullWidth id="name" label="username" size="small" onChange={(e) => {
                  setName(e.target.value)
                }}/>
              </div>
              <div><br/>
                <TextField required fullWidth id="email" size="small" label="email" onChange={(e) => {
                  setEmail(e.target.value)
                }}/>
              </div>
              <div><br/>
                <TextField required fullWidth id="password" size="small" type="password" label="password"
                           onChange={(e) => {
                             setPass(e.target.value)
                           }}/>
              </div>
              <div><br/>
                <TextField required fullWidth h id="confirmpassword" type="password" size="small"
                           label="confirm password" onChange={(e) => {
                  setPassConfirm(e.target.value)
                }}/>
              </div>
              <br/>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label type">Type</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue="developer"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <FormControlLabel value="developer" control={<Radio/>} label="Developer"/>
                  <FormControlLabel value="recruiter" control={<Radio/>} label="Recruiter"/>
                </RadioGroup>
              </FormControl>
              {
                type === 'recruiter' ?
                  <div>
                    <TextField required fullWidth id="address" size="small" label="address"
                               onChange={(e) => {
                                 setAddress(e.target.value)
                               }}/><br/>
                    <TextField id="outlined-multiline-flexible" label="History" size="small" multiline fullWidth
                               maxRows={4}
                               onChange={(e) => {
                                 setHistory(e.target.value)
                               }}
                    /><br/>

                  </div>
                  :
                  <div>

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
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label gender">Gender</FormLabel>
                      <RadioGroup
                        row
                        value={gender}
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}

                      >
                        <FormControlLabel value="m" control={<Radio/>} label="male"/>
                        <FormControlLabel value="f" control={<Radio/>} label="female"/>
                      </RadioGroup>
                    </FormControl>
                    <Button variant="text" component="label" color="info">
                      Upload your CV
                      <input id="file" type="file" hidden onChange={(e) => {
                        setCv(e.target.files[0])
                      }}/>
                    </Button>
                  </div>
              }
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  inputFormat="yyyy-MM-dd"
                  label="Date Of Birth"
                  size="small"

                  value={dateofbirth}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={(dateValue) => {
                    let datevalue = dateValue.getFullYear() + "-" + (dateValue.getMonth() + 1) + "-" + (dateValue.getDay() + 1)
                    setDateOfBirth(datevalue);
                    console.log(datevalue)
                  }}
                />
              </LocalizationProvider>
              <FormControlLabel control={<Checkbox defaultChecked/>} label="Allow Mail Notifications" onChange={(e) => {
                setMailNotification(!mailNotification)
                console.log(mailNotification)
              }}/>

            </CardContent>

            <CardActions>
              <Button variant="contained" type="submit">Sign Up</Button>
            </CardActions>
          </Card>
        </form>
      </div>

      <div className="right">
        <img className="signupinImage" src="/signupimage.png"/>
      </div>

    </div>
  )
}

export default Signup;


import * as React from 'react';
import {useState} from 'react';
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
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

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

  const [tagName, setTagName] = useState([]);
  const [name, setName] = useState("")
  const [password, setPass] = useState("")
  const [confirmPass, setPassConfirm] = useState("")
  const [email, setEmail] = useState("")
  const [type, setType] = useState("")
  const [gender, setGender] = useState("")
  const [cv, setCv] = useState("")
  const [history, setHistory] = useState("")
  const [address, setAddress] = useState("")
  const [dateofbirth, setDateOfBirth] = useState("")
  const [mailNotification, setMailNotification] = useState(true)

  let url = "http://localhost:8000/api/v1/account/"


  const handleChange = (event) => {
    console.log(event.target.value)
    const {
      target: {value},
    } = event;
    setTagName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  function validation() {
    let checkSubmit = true;
    console.log(name)
    if (name === "") {
      checkSubmit = false;
    } else if (password !== confirmPass || password === "") {
      checkSubmit = false;

    } else if (email === "") {
      checkSubmit = false;
    } else if (type === "developer") {
      url = url + "signupdeveloper/"
      console.log(url)
      if (cv === "" || dateofbirth === "")
        checkSubmit = false;

    } else if (type === "recruiter") {
      url = url + "signuprecruiter/"
      if (history === "" || address === "") {
        checkSubmit = false;
      }
    }
    return checkSubmit;

  }

  async function sendData(e) {
    e.preventDefault();

    if (true) {
      const response = await fetch(url + 'signupdeveloper/', {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(
          {
            username: name,
            password: password,
            confirm_password: confirmPass,
            email: email,
            type: type,
            gender: gender,
            cv: cv,
            history: history,
            address: address,
            date_of_birth: dateofbirth,
            allow_mail_notification: mailNotification
          }
        )
      })

      if (response.ok) {
        let data = await response.text();
        console.log(data);

      } else {

        console.log("error");
      }

    } else {
      console.log("validation error")
    }
  }

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

                    if (e.target.value === 'recruiter') {
                      setType(true)
                      console.log(type)
                    } else
                      setType(false)

                  }
                  }
                >
                  <FormControlLabel value="developer" control={<Radio/>} label="Developer"/>
                  <FormControlLabel value="recruiter" control={<Radio/>} label="Recruiter"/>
                </RadioGroup>
              </FormControl>
              {
                type ?
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

                    <FormControl sx={{m: 1, width: 300}}>
                      <InputLabel id="demo-multiple-checkbox-label tag">Tag</InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        size="small"
                        value={tagName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag"/>}
                        renderValue={(selected) => selected.map(obj => names[obj - 1].value).join(', ')}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem key={name.id} value={name.id}>
                            <Checkbox checked={tagName.indexOf(name.id) > -1}/>
                            <ListItemText primary={name.value}/>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl><br/>
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label gender">Gender</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}

                      >
                        <FormControlLabel value="male" control={<Radio/>} label="male"/>
                        <FormControlLabel value="female" control={<Radio/>} label="female"/>
                      </RadioGroup>
                    </FormControl><br/>
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
                    </LocalizationProvider><br/>
                    <Button variant="text" component="label" color="info">
                      {" "}
                      Upload your CV
                      <input id="file" type="file" hidden onChange={(e) => {
                        setCv(e.target.value)
                      }}/>
                    </Button><br/>
                  </div>
              }
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


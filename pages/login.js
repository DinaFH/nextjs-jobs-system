import {useContext, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import api from "../config/api";
import {USER_TOKEN} from "../config/constants";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import {AppContext} from "./_app";

const Login = () => {
  const [name, setName] = useState("")
  const [password, setPass] = useState("")
  const {getLoginData} = useContext(AppContext);
  const router = useRouter();

  async function sendData(e) {
    e.preventDefault();
    let checkSubmit = true;
    if (name === "") {
      checkSubmit = false;

    }
    if (password === "") {
      checkSubmit = false;
    }
    if (checkSubmit) {
      toast.info("Logging in...");
      const response = await api("/api/v1/account/rest_login", "POST", JSON.stringify({
        username: name, password
      }), {
        'content-type': 'application/json'
      });
      if (response?.token) {
        toast.success("Logged in successfully");
        localStorage.setItem(USER_TOKEN, response.token);
        getLoginData();
        await router.push('/');
      } else {
        toast.error("Invalid Credentials");
      }
    }
  }

  return (<div className="container">
    <div className="left">
      <Card sx={{maxWidth: 575}} style={{minHeight: '130vh'}}>
        <form onSubmit={sendData}>
          <CardContent>
            <center><img className="signupLogo" src="/signup.png"/></center>
            <center><h2 className="signupinHeader" color="blue">Sign In</h2></center>
            <div>
              <TextField required fullWidth id="name" label="username" onChange={(e) => {
                setName(e.target.value)
              }}/>
            </div>
            <br/>
            <div>
              <TextField required fullWidth id="password" type="password" label="password" onChange={(e) => {
                setPass(e.target.value)
              }}/>
            </div>
          </CardContent>
          <CardActions>
            <Button variant="contained" type="submit">Sign In</Button>
          </CardActions>
        </form>
      </Card>
    </div>
    <div className="right">
      <img className="signupinImage" src="/signupimage.png"/>
    </div>
  </div>)
}

export default Login;

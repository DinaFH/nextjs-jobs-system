import  { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

let login= ()=>{
    const[ name , setName ]=useState("")
    const[ password , setPass ]=useState("")
    const[ token , setToken ]=useState("")

    async function sendData(e) {
        e.preventDefault(); 
        const response= await fetch("http://localhost:8000/api/v1/account/rest_login/",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body: JSON.stringify({username:name , password:password})
  
        })
     
        if(response.ok)
        {
          let data = await response.json();
          console.log(data);
          setToken(data.token);
          console.log(token)
          localStorage.setItem('token', data.token)
  
        }   
        else{
  
          console.log("error");
        }  
    }

   return(
        <div class="container">

           <div class="left">
           <Card  sx={{ maxWidth: 575}} style={{ minHeight: '130vh' }}>
           <form onSubmit={sendData}>
           <CardContent>
           <center><img className="signupLogo" src="/signup.png"/></center>
           <center><h2  className="signupinHeader"color="blue">Sign In</h2></center>
           <div>
           <TextField required fullWidth id="name"label="username" onChange={(e)=>{
                setName(e.target.value)}} />   
            </div>
            <br/> <div>
        <TextField required fullWidth id="password" type="password" label="password" onChange={(e)=>{
                setPass(e.target.value)}}/>
       </div>
       
           </CardContent>

          <CardActions>
          <Button variant="contained"type="submit">Sign In</Button>
          </CardActions>
          </form>

          </Card>

           </div>
           <div class="right">
           <img className="signupinImage" src="/signupimage.png"/>

           </div>
        </div>
    )
}

export default login;
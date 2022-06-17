import Head from 'next/head'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Box from '@mui/material/Box';
//import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
export default function Home(){
  return(
   
    
      <Box>
    <Box>
          <div className="Container" style={{display: 'flex' ,alignItems:'center'}}> 
              <div style={{width:'50%'}}>
              <h1 className="mb-4 font-weight-normal line-height-1_4">Welcome to our Website<span className="text-primary font-weight-medium"></span></h1>
   
              <h3> 
              Forget the old rules. You can have the best people.Right now. Right here.</h3>
            </div>
        <div style={{width:'50%'}}>
               <img src="/job2.png" style={{objectFit:'cover'}}/>
        </div>

        </div>
 </Box>
 
 
</Box>
   
  )
}
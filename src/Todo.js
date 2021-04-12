///it is a component
import {ListItemText } from '@material-ui/core'
import {List } from '@material-ui/core'
import {ListItem } from '@material-ui/core'
import { Modal } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import React, { PureComponent } from 'react'
import db from './firebase';
import DeleteIcon from '@material-ui/icons/Delete';
import { useState } from 'react';
import { Input, InputLabel } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));



export default function Todo(props) {
    const classes = useStyles();
    const [open,setOpen] = useState(false);
    const [input, setInput] = useState("");
    
   /* const handleOpen = ()=>{
        setOpen(true);

    };*/

   const updateTodo = ()=>{
    //update todo w/ new input text//merge:true prevents from overwriting already existing values
    db.collection('todos').doc(props.todo.id).set({
        todo:input},{merge:true})
    setOpen(false);
    }

    
    return (
           
            
            <>
            <Modal
                open={open}
                onClose={()=>setOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={classes.paper}>
                    <h1>I am a modal</h1>
                    <Input placeholder={props.todo.todo} value={input} onChange={(event)=>{setInput(event.target.value)}}/>
                    <Button variant="contained" color="secondary" onClick={updateTodo}>update todo</Button>    
                </div>    
            </Modal>
            
                <List style={{display:"flex", alignItems:"center", justifyContent:"center" }}>
                    
                    <ListItem style={{textAlign:"center"}}>
                        <ListItemText primary={props.todo.todo} secondary="dummy-deadline"/>
                    </ListItem>
                    {/* <li>{props.text}</li> */}
                    <button style={{backgroundColor:"#FBBF24", border:"none", borderRadius:"0.2rem",color:""}} onClick={()=>setOpen(true)}>Edit</button>
                    <DeleteIcon onClick={event=>db.collection('todos').doc(props.todo.id).delete()}Delete me/>
                    
                </List>

            </>
    )
}

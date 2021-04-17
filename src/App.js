
import './App.css';
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import { useEffect } from 'react';
import firebase from "firebase"; 

function App() {

    const [todos, setTodos] = useState([]);
    const[input, setInput] = useState("");
    //when the app loads we need to listen to the database and fetch new todos  as they get added/removed

    useEffect(() => {
      //this code fires when app loads
      db.collection("todos").orderBy('timestamp','desc').onSnapshot(snapshot =>{ //whenever database changes we get a instance of db
        setTodos(snapshot.docs.map(doc => ({ id:doc.id ,todo:doc.data().todo}))); //here we set our todos as the data fetched from db
      })
    },[]);



    const addTodo = event=>{
      //setTodos([...todos, input]);
      db.collection("todos").add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      setInput("");
      event.preventDefault();//prevents default stting associated w/ submit in for form
    }
    
  
  return (
    <div style={{textAlign:"center"}}>
     <h1>ToDo App</h1>
     <FormControl>
       <div style={{display:"flex"}}>
        <InputLabel>Enter Todo</InputLabel>
        <Input  value={input} onChange={event=>{setInput(event.target.value)}}/>
        <Button  variant="contained" color="primary" disabled={!input} type="submit" onClick={addTodo}> add</Button>
        </div>
      </FormControl>  
     
      <ul>
          {todos.map(todo => (
            <Todo todo={todo}/>
            // <li>{todo}</li>
          ))}
      </ul> 
    </div>
  );
}

export default App;

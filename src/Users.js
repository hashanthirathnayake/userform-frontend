import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import  Axios from "axios";
import { useEffect, useState } from "react";



const Users=() =>{

    const [users, setUsers] =useState([]);
    const [submitted, setSubmitted]= useState(false);
    const [selectedUser, setSelectedUser]= useState({});
    const [isEdit, setIsEdit]= useState(false);

    useEffect(() => {
            getUsers();  //call getUsers function

    }, []); // dependeny list 



const  getUsers=() =>{

    Axios.get('http://localhost:3001/api/users')
     .then(response => {

        //console.log(response);
        //console.log(response.data.response);   
        setUsers(response.data?.response || []);
    })
    .catch(error => {
        console.error(" Axios Error:"  , error);
    });
   
        
}

 

//for add user

const addUser = (data) =>{

    setSubmitted(true);

    const payload ={
        id: data.id,
        name: data.name,
    }


    Axios.post('http://localhost:3001/api/createuser', payload)
    .then(response => {

       //console.log(response);
       //console.log(response.data.response);   
       getUsers(response.data?.response || []);
       setSubmitted(false);
       isEdit(false);
   })
   .catch(error => {
       console.error(" Axios Error:"  , error);
   });


}



//update user

const updateUser =(data) =>{

    setSubmitted(true);

    const payload={
        id:data.id,
        name:data.name,
    }


    Axios.post('http://localhost:3001/api/updateuser', payload)
    .then(response => {

       //console.log(response);
       //console.log(response.data.response);   
       getUsers(response.data?.response || []);
       setSubmitted(false);
   })
   .catch(error => {
       console.error(" Axios Error:"  , error);
   });

}


// delete user


const deleteUser=(data)=>{

    
    Axios.post('http://localhost:3001/api/deleteuser', data)
    .then(response => {

        
       getUsers(response.data?.response || []);
       setSubmitted(false);
   })
   .catch(error => {
       console.error(" Axios Error:"  , error);
   });

}




return(
    <Box
        sx={{

            width:'calc(100%-100%)',
            margin: 'auto',
            marginTop: '100px',
        }}>
         <UserForm
         addUser= {addUser}
         updateUser={updateUser}
         submitted={submitted}
         data={selectedUser}
         isEdit={isEdit}
         

         />
         <UsersTable 
         
            rows={users}
            selectedUser ={data => {
                setSelectedUser(data);
                setIsEdit(true);

            } 

            }
         
            deleteUser={data =>window.confirm('Are you sure') && deleteUser(data)}
         />
    </Box>
);












}
export default Users;
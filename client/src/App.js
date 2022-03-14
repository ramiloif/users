import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsCreateUserFormOpen } from './features/users/usersSlice'
import ButtonAppBar from './features/bar/AppBar';
import UsersList from './features/users/users-list';
import CreateUser from './features/users/create-user';
import Modal from '@mui/material/Modal';
import './App.css';

function App() {
  const isFormOpen = useSelector(selectIsCreateUserFormOpen)

  return (
    <div className="App">
      <Modal
         style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        open={isFormOpen}
        onClose={()=> {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
          <div>
              <CreateUser/>
          </div>
      </Modal>
      <ButtonAppBar/>
      <UsersList/>
      
    </div>
  );
}

export default App;

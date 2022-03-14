
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Alert, FormControl, Button, TextField, Typography, Box, Stack, } from '@mui/material';
import { createUser } from './users-api';
import { toggleCreateForm, toggleRefresh } from '../users/usersSlice';
import validator from 'validator';


export default function CreateUser() {
    const dispath = useDispatch()
    const [ firstname, setFirstname ] = useState('');
    const [ lastname, setLastname ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ description, setDescription ] = useState('');

    const [ firstNameError, setFirstnameError ] = useState(false);
    const [ lastNameError, setlastnameError ] = useState(false);
    const [ passwordError, setPasswordError ] = useState(false);
    const [ emailError, setEmailError ] = useState(false);
    const [ descriptionError, setDescriptionError ] = useState(false);

    const [ emailHelperText, setEmailHelperText ] = useState('');
    const [success, setSuccess] = useState(false)

    const validateFirstname = () => {
        if(!firstname) {
            setFirstnameError(true)
            return false;
        } else {
            setFirstnameError(false)
            return true;
        }
    }

    const validateLastname = () => {
        if(!lastname) {
            setlastnameError(true);
            return false;
        } else {
            setlastnameError(false)
            return true;
        }
    }

    const validateEmail = () => {
        if(!email) {
            setEmailError(true)
            return false;
        } else {
            if(!validator.isEmail(email)) {
                setEmailError(true)
                setEmailHelperText('Email not valid')
                return false;
            } else {
                setEmailError(false)
                setEmailHelperText('')
                return true;
            }
        }
    }

    const validatePassword = () => {
        if(!password) {
            setPasswordError(true)
            return false;
        } else {
            setPasswordError(false)
            return true;
        }
    }

    const validateDescription = () => {
        if(!description) {
            setDescriptionError(true)
            return false;
        } else {
            setDescriptionError(false)
            return true;
        }
    }

    const handleSubmit = async () => {
        if(
            validateFirstname() &&
            validateLastname() &&
            validateEmail() &&
            validatePassword() &&
            validateDescription()) {
             const userDto = {
                 firstname,
                 lastname,
                 email,
                 password,
                 description
            }
                
                try {
                    await createUser(userDto)
                    setSuccess(true)
                    dispath(toggleRefresh())
                } catch(e) {
                    setEmailHelperText('Email Already exist')
                    setEmailError(true)
                }
            }
    }

    const closeForm = () => {
        dispath(toggleCreateForm())
    }

    return(
    <Box sx={{ bgcolor: '#c5cae9' }}>
     <form style={{}}>
    <FormControl sx={{ m: 3 }} error={false} variant="standard">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Create User
        </Typography>

        {success && <Alert severity="success">User created successfully!</Alert>}

        <TextField
            disabled={success}
            error={firstNameError}
            required
            id="firstname"
            label="First Name"
            margin="normal"
            value={ firstname }
            onChange={ (e) => { setFirstname(e.target.value) }}
        />

        <TextField
            disabled={success}
            error={lastNameError}
            required
            id="lastname"
            label="Last Name"
            margin="normal"
            value={ lastname }
            onChange={ (e) => { setLastname(e.target.value) }}
        />

        <TextField
            disabled={success}
            required
            error={emailError}
            id="email"
            label="Email"
            type="mail"
            margin="normal"
            value={ email }
            helperText={emailHelperText}
            onChange={ (e) => { setEmail(e.target.value) }}
        />

        <TextField
            disabled={success}
            required
            error={passwordError}
            id="password"
            label="Password"
            margin="normal"
            type="password"
            value={ password }
            onChange={ (e) => { setPassword(e.target.value) }}
        />

        <TextField
            disabled={success}
            required
            error={descriptionError}
            multiline
            maxRows={4}
            id="description"
            label="Description"
            margin="normal"
            value={ description }
            onChange={ (e) => { setDescription(e.target.value) }}
        />

        {!success && <Stack spacing={2} direction="row"> 
            <Button 
                variant="contained" 
                onClick={handleSubmit} >Create</Button>
            <Button
                onClick={closeForm}
                variant="text">Cancel</Button>
        </Stack>}

        {success &&  
        <Button 
                onClick={closeForm}
                variant="text">Close</Button> }
    </FormControl>
        </form>
    </Box>
    )
}


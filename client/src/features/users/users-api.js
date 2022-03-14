import axios from 'axios';

export const fetchUsers = async () => {
  return axios.get(`http://localhost:3000/users/`)
}

export const createUser = async (createUserDto) => {
  return axios.post(`http://localhost:3000/users/`, createUserDto)
}
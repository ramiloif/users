import axios from 'axios';

// A mock function to mimic making an async request for data
export async function getHello() {
 return axios.post(`http://localhost:3000/getDick`)
}

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, fetchUsersAction, selectRefresh } from './usersSlice'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'firstname', label: 'First Name', minWidth: 100 },
  { id: 'lastname', label: 'Last Name', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'description',label: 'Description', minWidth: 170 },
];

export default function UsersList() {
const users = useSelector(selectUsers);
const refresh = useSelector(selectRefresh);
const dispatch = useDispatch()

 useEffect(() => {
    dispatch(fetchUsersAction())    
 }, [dispatch, refresh])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 900, minHeight: 900 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={user.email}>
                    {columns.map((column) => {
                      const value = user[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
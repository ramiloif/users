import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectHello,
  getHelloAction
} from './helloSlice';
import styles from './Hello.module.css';

export function Hello() {
  const helloFromServer = useSelector(selectHello);
  const dispatch = useDispatch();
  
useEffect(() => {
  dispatch(getHelloAction())
})

  return (
      <div className={styles.row}>
       Server says: {helloFromServer}
    </div>
  );
}

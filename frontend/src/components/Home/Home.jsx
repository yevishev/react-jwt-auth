import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

import api from '../../libs/api';
import styles from './Home.module.css';

export default (() => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
      api.session.get().then((isValid) => {
          if (!isValid.res) {
              navigate('/login');
              return;
          }
          setData(isValid);
      });
    }, []);

    const handleLogout = () => {
      api.session.delete().then(() => {
        navigate('/login')
      })
    }

    return (
        <div className={styles.userProfile} >
          <h1>User Profile</h1>
          <div className={styles.userInfo}>
            <p>Email: {data.email}</p>
          </div>
          <div className={styles.userInfo}>
            <a 
                onClick={handleLogout}
                href="#">Logout</a>
          </div>
        </div>
      );
});
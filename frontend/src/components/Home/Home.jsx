import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";

import Spinner from '../Spinner/Spinner';

import api from '../../libs/api';
import styles from './Home.module.css';

export default (() => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setIsLoading(true);
      api.session.get().then((isValid) => {
          if (!isValid.res) {
              navigate('/login');
              return;
          }
          setData(isValid);
          setIsLoading(false);
      });
    }, []);

    const handleLogout = () => {
      setIsLoading(true);
      api.session.delete().then(() => {
        navigate('/login')
        setIsLoading(false);
      });
    }

    return (
        <div className={styles.userProfile}>
          <h1>User Profile</h1>
          <div className={styles.userInfo}>
            <p>Email: {data.email}</p>
          </div>
          <div className={styles.userInfo}>
            <a 
                onClick={handleLogout}
                href="#">Logout</a>
          </div>
          {isLoading && <Spinner />}
        </div>
      );
});
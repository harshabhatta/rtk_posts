import React from 'react';
import { useSelector } from 'react-redux';
import styles from './UserDetails.module.css';

const UserDetails = ({ userId }) => {
  const { users } = useSelector((state) => state.users);

  const getUser = () => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : 'Unknown author';
  };
  return <aside className={styles.users}>By {getUser()}</aside>;
};

export default UserDetails;

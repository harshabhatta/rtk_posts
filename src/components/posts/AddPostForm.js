import React, { useState } from 'react';
import styles from './AddPostForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addPost, savePost } from '../../features/postsSlice';

const AddPostForm = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('');

  const btnDisabled = () => {
    return [title, body, userId].every(Boolean) ? false : true;
  };

  const addPostDetails = () => {
    // two ways of savings the post - adding directly to Posts thrn calling the API
    // dispatch(addPost({ userId, title, body }));
    dispatch(savePost({ userId, title, body }));
    setTitle('');
    setBody('');
    setUserId('');
  };

  return (
    <>
      <h2 className={styles.header}>Add a Post</h2>
      <form className={styles.formContainer}>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor='users'>Users</label>
        <select
          name='users'
          id='users'
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        >
          <option value=''>Select the User</option>
          {users.users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <label htmlFor='body'>Body</label>
        <textarea
          name='body'
          id='body'
          cols='30'
          rows='3'
          value={body}
          maxLength={90}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button
          type='button'
          className={styles.btnSubmit}
          onClick={addPostDetails}
          disabled={btnDisabled()}
        >
          Add Post
        </button>
      </form>
    </>
  );
};

export default AddPostForm;

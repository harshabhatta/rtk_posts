import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserDetails from '../users/UserDetails';
import styles from './PostsList.module.css';
import Reactions from './Reactions';
import { getPosts } from '../../features/postsSlice';

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    if (posts.status === 'idle') dispatch(getPosts());
  }, [dispatch, posts.status]);

  return (
    <section>
      <h1 className={styles.header}>Posts</h1>
      {posts.status === 'success' ? (
        posts.posts.map((post) => {
          return (
            <article className={styles.postContainer} key={post.id}>
              <h4 className={styles.title}>{post.title}</h4>
              <p>{post.body}</p>
              <div>
                <UserDetails userId={post.userId} />
                <Reactions post={post} />
              </div>
            </article>
          );
        })
      ) : (
        <div>Loading....</div>
      )}
    </section>
  );
};

export default PostsList;

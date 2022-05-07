import React from 'react';
import styles from './Reactions.module.css';
import { addReaction } from '../../features/postsSlice';
import { useDispatch } from 'react-redux';

const reactionEmoji = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
};

const Reactions = ({ post }) => {
  const dispatch = useDispatch();
  return (
    <aside>
      {Object.entries(reactionEmoji).map(([k, v]) => {
        return (
          <button
            key={k}
            className={styles.reactionBtn}
            onClick={() => dispatch(addReaction({ id: post.id, reaction: k }))}
          >
            {v} {post.reaction[k]}
          </button>
        );
      })}
    </aside>
  );
};

export default Reactions;

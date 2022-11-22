import styles from '../styles/home.module.css';
import { Comment } from '../components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createComment, toggleLike } from '../api';
import { useState } from 'react';
import { usePosts } from '../hooks';
import { useToasts } from 'react-toast-notifications';

const Post = ({ post }) => {
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();
  const { addToast } = useToasts();

  const handleAddComment = async (e) => {
    if (e.key === 'Enter') {
      setCreatingComment(true);

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment('');
        posts.addComment(response.data.comment, post._id);
        addToast('Comment created successfully!', {
          appearance: 'success',
        });
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
      }

      setCreatingComment(false);
    }
  };

  const handlePostLikeClick = async () => {
    const response = await toggleLike(post._id, 'Post');

    if (response.success) {
      if (response.data.deleted) {
        addToast('Like removed successfully!', {
          appearance: 'success',
        });
      } else {
        addToast('Like added successfully!', {
          appearance: 'success',
        });
      }
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
  };

  return (
    <div className={styles.postWrapper} key={post._id}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/4333/4333609.png"
            alt="user-pic"
          />
          <div>
            <Link to={`/user/${post.user._id}`}> {post.user.name}</Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button onClick={handlePostLikeClick}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/126/126473.png"
                alt="likes-icon"
              />
            </button>
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/13/13673.png"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => {
            return <Comment comment={comment} key={comment._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;

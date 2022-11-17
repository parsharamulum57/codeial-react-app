import styles from '../styles/home.module.css';
import { Comment } from '../components';
import PropTypes from 'prop-types';

const Post = ({ post }) => {
  return (
    <div className={styles.postWrapper} key={post._id}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/4333/4333609.png"
            alt="user-pic"
          />
          <div>
            <span className={styles.postAuthor}>{post.user.name}</span>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button>
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
          <input placeholder="Start typing a comment" />
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

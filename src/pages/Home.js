import { CreatePost, FriendsList, Post } from '../components';
import { Loader } from '../components';
import { useAuth, usePosts } from '../hooks';
import styles from '../styles/home.module.css';

export default function Home(props) {
  const posts = usePosts();
  const auth = useAuth();

  console.log('posts ', posts);

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => {
          return <Post post={post} key={post._id} />;
        })}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
}

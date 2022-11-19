import { useEffect, useState } from 'react';
import { getPost } from '../api';
import { Post } from '../components';
import { Loader } from '../components';

export default function Home(props) {
  let [posts, setPosts] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      let response = await getPost();
      console.log('response ', response);

      if (response.success) {
        setPosts(response.data.posts);
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {posts.map((post) => {
        return <Post post={post} key={post._id} />;
      })}
    </div>
  );
}

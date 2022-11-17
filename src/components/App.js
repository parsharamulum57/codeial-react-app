import { useEffect, useState } from 'react';
import { getPost } from '../api';
import { Home } from '../pages';
import { Navbar,Loader } from './';

function App() {
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
    <div className="App">
      <Navbar />
      <Home posts={posts} />
    </div>
  );
}

export default App;

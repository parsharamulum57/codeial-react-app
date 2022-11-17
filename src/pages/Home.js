import PropTypes from 'prop-types';

import { Post } from '../components';

export default function Home(props) {
  const posts = props.posts;
  console.log('posts ', posts);

  return (
    <div>
      {posts.map((post) => {
        return <Post post={post} key={post._id} />;
      })}
    </div>
  );
}

Home.propTypes = {
  posts: PropTypes.array.isRequired,
};

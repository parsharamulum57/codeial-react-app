import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import {
  getPost,
  login as userLogin,
  register,
  updateProfile as editProfile,
} from '../api';
import {
  getItemInLocalStorage,
  LOCALSTOREGE_TOKEN_KEY,
  removeItemInLocalStorage,
  setItemInLocalStorage,
} from '../utils';

import jwt from 'jwt-decode';
import { PostsContext } from '../providers/PostProvider';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let token = getItemInLocalStorage(LOCALSTOREGE_TOKEN_KEY);
    if (token) {
      let user = jwt(token);
      setUser(user);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    let response = await userLogin(email, password);

    if (response.success) {
      console.log('in login user', response.data.user);
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTOREGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const updateUserInContext = (userObj) => {
    setUser(userObj);
    return;
  };

  const updateUserFriends = (addFriend, friendship) => {
    if (addFriend) {
      setUser({
        ...user,
        friendship: [user.friendship, friendship],
      });
      return;
    }

    const newFriends = user.friendships.filter((f) => {
      return f.to_user._id !== friendship.to_user._id;
    });
    setUser({
      ...user,
      friendship: newFriends,
    });
  };

  const updateProfile = async (userId, name, password, confirmPassword) => {
    let response = await editProfile(userId, name, password, confirmPassword);

    console.log('In updateProfile response', response);
    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTOREGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemInLocalStorage(LOCALSTOREGE_TOKEN_KEY);
  };

  const signup = async (name, email, password, confirmPassword) => {
    const response = await register(name, email, password, confirmPassword);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    signup,
    updateProfile,
    updateUserInContext,
    updateUserFriends,
  };
};

export const usePosts = () => {
  return useContext(PostsContext);
};

export const useProvidePosts = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPost();

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  const addPostToState = (post) => {
    const newPosts = [post, ...posts];

    setPosts(newPosts);
  };

  const addComment = (comment, postId) => {
    const newPosts = posts.map((post) => {
      if (post._id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });

    setPosts(newPosts);
  };

  return {
    data: posts,
    loading,
    addPostToState,
    addComment,
  };
};

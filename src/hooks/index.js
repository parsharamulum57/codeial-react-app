import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import {
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
  };
};

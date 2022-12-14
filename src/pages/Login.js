import { useState } from 'react';
import styles from '../styles/login.module.css';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import { Navigate } from 'react-router-dom';
import { fetchUserFriends } from '../api';

const Login = () => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [loggingIn, setLoggingIn] = useState(false);
  const { addToast } = useToasts();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoggingIn(true);

    if (!email || !password) {
      addToast('Please enter username and password :', {
        appearance: 'error',
      });
    } else {
      let response = await auth.login(email, password);
      console.log(response);
      if (response.success) {
        addToast('Successfully Logged in', {
          appearance: 'success',
        });
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
      }
    }
    setLoggingIn(false);
  };

  async function updateUser() {
    let res = await fetchUserFriends();

    console.log('fetching friends ', res.data, auth.user);
    if (res.success) {
      auth.updateUserInContext({
        ...auth.user,
        friendships: res.data.friends,
      });
    } else {
      auth.updateUserInContext({
        ...auth.user,
        friendships: [],
      });
    }
  }

  if (auth.user) {
    updateUser();
    return <Navigate to="/" />;
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>

      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="user-name"
        />
      </div>

      <div className={styles.field}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </div>

      <div className={styles.field}>
        <button disabled={loggingIn}>
          {loggingIn ? 'Logging in...' : 'Log In'}
        </button>
      </div>
    </form>
  );
};

export default Login;

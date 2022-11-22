import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { addFriend, fetchUser, removeFriend } from '../api';
import { Loader } from '../components';
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';

const UserProfile = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const { addToast } = useToasts();
  const { navigate } = useNavigate();

  useEffect(() => {
    const getUser = async (userId) => {
      let response = await fetchUser(userId);
      console.log('In UserProfile getUser response', response);

      if (response.success) {
        setUser(response.data.user);
      } else {
        addToast('User not exists in DB', {
          appearance: 'error',
        });
        navigate('/login');
      }

      setLoading(false);
    };
    getUser(userId);
  }, [userId, navigate, addToast]);

  const checkIfUserIsFriend = () => {
    let friendIds = auth.user.friendships.map((friend) => {
      return friend.to_user._id;
    });

    let index = friendIds.indexOf(userId);
    //console.log('index ', index);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  const handleAddFriend = async () => {
    setRequestInProgress(true);
    let res = await addFriend(user._id);

    if (res.success) {
      let friendship = auth.user.friendships.filter((friend) => {
        return friend.to_user._id === userId;
      });
      auth.updateUserFriends(false, friendship[0]);
      addToast('Friend Removed successfully', {
        appearance: 'success',
      });
    } else {
      addToast(res.message, {
        appearance: 'error',
      });
    }
    setRequestInProgress(false);
  };

  const handleRemoveFriend = async () => {
    setRequestInProgress(true);
    let res = await removeFriend(userId);

    if (res.success) {
      let { friendship } = res.data;
      auth.updateUserFriends(true, friendship);
      addToast('Friend added successfully', {
        appearance: 'success',
      });
    } else {
      addToast(res.message, {
        appearance: 'error',
      });
    }
    setRequestInProgress(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/236/236832.png"
          alt="userImage"
        ></img>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsFriend() ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              disabled={requestInProgress}
              onClick={handleRemoveFriend}
            >
              {requestInProgress ? 'Removing Friend...' : 'Remove Friend'}
            </button>
          </>
        ) : (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              disabled={requestInProgress}
              onClick={handleAddFriend}
            >
              {requestInProgress ? 'Adding Friend...' : 'Add Friend'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

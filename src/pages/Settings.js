import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useAuth } from '../hooks';
import styles from '../styles/settings.module.css';

const Settings = () => {
  const auth = useAuth();
  const [name, setName] = useState(auth.user ? auth.user.name : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [savingForm, setSavingForm] = useState(false);
  const { addToast } = useToasts();

  const updateProfile = async () => {
    setSavingForm(true);

    let error = false;
    if (!name || !password || !confirmPassword) {
      addToast('Please fill all the fields', {
        appearance: 'error',
        autoDismiss: true,
      });
      error = true;
    } else if (password !== confirmPassword) {
      addToast('Make Sure paassworn and confirm password are same', {
        appearance: 'error',
        autoDismiss: true,
      });
      error = true;
    }

    if (!error) {
      let response = await auth.updateProfile(
        auth.user._id,
        name,
        password,
        confirmPassword
      );

      if (response.success) {
        addToast('successfully updated', {
          appearance: 'success',
          autoDismiss: true,
        });
        setEditMode(false);
        setPassword('');
        setConfirmPassword('');
      } else {
        addToast(response.message, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }

    setSavingForm(false);
  };

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
        <div className={styles.fieldValue}>
          {auth.user ? auth.user.email : 'NA'}
        </div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </>
        ) : (
          <div className={styles.fieldValue}>{name}</div>
        )}
      </div>
      {editMode && (
        <>
          <form>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Password</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <div className={styles.field}>
              <div className={styles.fieldLabel}>Confirm Password</div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          </form>
        </>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
              disabled={savingForm}
            >
              {savingForm ? 'Saving profile...' : 'Save profile'}
            </button>
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditMode(false)}
            >
              Go back
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;

import { Link } from 'react-router-dom';

import styles from '../styles/navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
        <Link to="/">
          <img
            alt=""
            src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          />
        </Link>
      </div>

      <div className={styles.rightNav}>
        <div className={styles.user}>
          <Link to="/settings">
            <img
              src="https://cdn-icons-png.flaticon.com/128/236/236832.png"
              alt=""
              className={styles.userDp}
            />
          </Link>
          <span>Parsh</span>
        </div>

        <div className={styles.navLinks}>
          <ul>
            <li>
              <Link to="/logout">Log Out</Link>
            </li>

            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

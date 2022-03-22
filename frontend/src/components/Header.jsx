import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  };

  const showLogout = (
    <li>
      <button className='btn' onClick={onLogout}>
        <FaSignOutAlt />
        Logout
      </button>
    </li>
  );

  const showLoginAndRegister = (
    <>
      <li>
        <Link to='/login'>
          <FaSignInAlt />
          Login
        </Link>
      </li>
      <li>
        <Link to='/register'>
          <FaUser />
          Register
        </Link>
      </li>
    </>
  );

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Support Desk</Link>
      </div>
      <ul>{user ? showLogout : showLoginAndRegister}</ul>
    </header>
  );
};
export default Header;

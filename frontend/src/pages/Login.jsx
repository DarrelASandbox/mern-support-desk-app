import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { login, reset } from '../features/auth/authSlice';

const Login = () => {
  const initialFormState = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData)).then((res) => {
      if (res.error) toast.error(res.payload);
      if (res.type.includes('fulfilled')) navigate('/');

      dispatch(reset());
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Please login.</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              value={email}
              name={email}
              onChange={onChange}
              placeholder='Enter your email'
              required></input>
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              value={password}
              name={password}
              onChange={onChange}
              placeholder='Enter your password'
              required></input>
          </div>

          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};
export default Login;

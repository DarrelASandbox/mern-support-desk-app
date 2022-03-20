import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  const initialFormState = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
  };

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
              required
            ></input>
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
              required
            ></input>
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
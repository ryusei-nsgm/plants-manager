import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react';

const SignUp = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        // console.log(error.code);
        setError(error.message);
      });
    ;
  };

  return (
    <div>
      <h1>ユーザ登録</h1>
      <div>
        {error && (
          <p style={{ color: 'red' }}>{error}</p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input name="email" type="email" placeholder="email" />
        </div>
        <div>
          <label>パスワード</label>
          <input name="password" type="password" placeholder="password" />
        </div>
        <div>
          <button>登録</button>
        </div>
        <div>
          ログインは<Link to={'/login'}>こちら</Link>から
        </div>
      </form>
    </div>
  );
};

export default SignUp;
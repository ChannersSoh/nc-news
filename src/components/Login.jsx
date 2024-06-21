import { useState } from 'react';
import { getUserByUsername } from './utils/utils';

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();
    if (username) {
      getUserByUsername(username)
        .then((user) => {
          setUser(user);
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          setError(null);
        })
        .catch((err) => {
          console.error("Error fetching user:", err); 
          setError("User not found");
        });
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default Login;
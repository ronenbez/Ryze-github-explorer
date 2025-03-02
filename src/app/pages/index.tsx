import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Repo } from '../utils/api';

const Home = () => {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRepos = async () => {
    setLoading(true);
    setError('');
    try {
      const cachedRepos = localStorage.getItem(username);
      if (cachedRepos) {
        setRepos(JSON.parse(cachedRepos));
      } else {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        setRepos(response.data);
        localStorage.setItem(username, JSON.stringify(response.data));
      }
    } catch (err) {
      setError('Failed to fetch repositories');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>GitHub Repository Explorer</h1>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchRepos}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {repos.map((repo) => (
          <li key={repo.id ? repo.id : null}>
            <Link href={`/repo/${repo.name}`}>
              <a>{repo.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

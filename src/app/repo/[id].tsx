import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Repo, Contributor } from '../utils/api';

const RepoDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [repo, setRepo] = useState<Repo | null>(null);
  const [contributors, setContributors] = useState<Contributor[]>([]);

  useEffect(() => {
    if (id) {
      axios.get(`https://api.github.com/repos/facebook/${id}`)
        .then(response => setRepo(response.data));
      axios.get(`https://api.github.com/repos/facebook/${id}/contributors`)
        .then(response => setContributors(response.data));
    }
  }, [id]);

  if (!repo) return <p>Loading...</p>;

  return (
    <div>
      <h1>{repo.name}</h1>
      <p>{repo.description}</p>
      <p>Language: {repo.language}</p>
      <p>Stars: {repo.stargazers_count}</p>
      <h2>Top Contributors</h2>
      <ul>
        {contributors.slice(0, 5).map(contrib => (
          <li key={contrib.id}>
            <a href={contrib.html_url} target="_blank">{contrib.login}</a>
          </li>
        ))}
      </ul>
      <button onClick={() => router.back()}>Back</button>
    </div>
  );
};

export default RepoDetails;
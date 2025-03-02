import Link from 'next/link';
import Repo from '../app/pages/index'; 

const RepoList = ({ repos, onSort }) => {
  return (
    <div>
      <button onClick={onSort}>Sort by Stars</button>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <Link href={`/repo/${repo.name}`}>
              <a>{repo.name} - ⭐ {repo.stargazers_count}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;


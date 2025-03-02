import Link from 'next/link';
import { Repo } from '../app/utils/api';

interface Props {
    repos: Repo[];
    onSort: () => void;
  }

const RepoList: React.FC<Props> = ({ repos, onSort }) => {
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


const RepoDetails = ({ repo, contributors, onBack }) => {
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
              <a href={contrib.html_url} target="_blank" rel="noopener noreferrer">
                <img src={contrib.avatar_url} alt={contrib.login} width={30} />
                {contrib.login}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={onBack}>Back</button>
      </div>
    );
  };
  
  export default RepoDetails;
  import axios from 'axios';
  
  export const fetchRepos = async (username: string) => {
    const cachedRepos = localStorage.getItem(username);
    if (cachedRepos) return JSON.parse(cachedRepos);
    
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    localStorage.setItem(username, JSON.stringify(response.data));
    return response.data;
  };
  
  export const fetchRepoDetails = async (owner: string, repo: string) => {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
    return response.data;
  };
  
  export const fetchContributors = async (owner: string, repo: string) => {
    const cacheKey = `${owner}/${repo}-contributors`;
    const cachedContributors = localStorage.getItem(cacheKey);
    if (cachedContributors) return JSON.parse(cachedContributors);
    
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`);
    localStorage.setItem(cacheKey, JSON.stringify(response.data));
    return response.data;
  };

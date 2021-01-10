import React from 'react';

const Repo = (props) => {
  const {repo} = props;
  const {name, description, url} = repo.info;
  const {username} = repo.owner;
  const {stargazersCount, watchersCount, forksCount} = repo.stats;

  return (
    <tr>
      <td><a href={url} target="_blank">{name}</a></td>
      <td>{description}</td>
      <td>{username}</td>
      <td>{stargazersCount}</td>
      <td>{watchersCount}</td>
      <td>{forksCount}</td>
    </tr>
  );
};

export default Repo;
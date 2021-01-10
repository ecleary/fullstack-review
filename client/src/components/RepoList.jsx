import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => {
  const {repos} = props;
  const repoListItems = repos.map(repo => <Repo key={repo._id} repo={repo} />);

  return (
    <div>
      <h4> Repo List Component </h4>
      There are {repos.length} repos.
      <table>
        <thead>
          <tr>
            <td><strong>Name</strong></td>
            <td><strong>Description</strong></td>
            <td><strong>Owner</strong></td>
            <td><strong>Stargazers</strong></td>
            <td><strong>Watchers</strong></td>
            <td><strong>Forks</strong></td>
          </tr>
        </thead>
        <tbody>
          {repoListItems}
        </tbody>
      </table>
    </div>
  );
};

export default RepoList;
import React from 'react';

const RepoList = (props) => {
  const {repos} = props;
  return (
    <div>
      <h4> Repo List Component </h4>
      There are {repos.length} repos.
    </div>
  );
};

export default RepoList;
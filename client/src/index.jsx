import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    };
    this.getData = this.getData.bind(this);
    this.postData = this.postData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  };

  componentDidMount() {
    this.getData();
  };

  getData (callback) {
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'GET',
      success: (data) => {
        this.setState({
          repos: data
        });
        if (callback) {
          callback(null, data);
        } //else {
        //   console.log(data); // temp?
        // }
      },
      error: (err) => {
        if (callback) {
          callback(err);
        } else {
          console.error(err);
        }
      }
    });
  };

  postData (term, callback) {
    const data = {term};
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'POST',
      data: data,
      success: (data) => {
        if (callback) {
          callback(null, data);
        } else {
          console.log(data);
        }
        this.getData();
      },
      error: (err) => {
        if (callback) {
          callback(err);
        } else {
          console.error(err);
        }
      }
    });
  };

  deleteData (term, callback) {
    const data = {term};
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'DELETE',
      data: data,
      success: (data) => {
        if (callback) {
          callback(null, data);
        } else {
          console.log(data);
        }
        this.getData();
      },
      error: (err) => {
        if (callback) {
          callback(err);
        } else {
          console.error(err);
        }
      }
    });
  };

  handleSearch (term, callback) {
    this.postData(term, callback);
  };

  handleRemove (term, callback) {
    this.deleteData(term, callback);
  };

  render () {
    const {repos} = this.state;
    return (<div>
      <h1>GitHub Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={this.handleSearch} onRemove={this.handleRemove} />
    </div>);
  };
}

ReactDOM.render(<App />, document.getElementById('app'));

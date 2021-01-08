import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.clearInput = this.clearInput.bind(this);
  };

  handleChange(e) {
    const {value} = e.target;
    this.setState({
      term: value
    });
  };

  handleSearch(e) {
    e.preventDefault();
    const {term} = this.state;
    const {onSearch} = this.props;
    onSearch(term, this.clearInput);
  };

  clearInput(err) {
    if (err) {
      console.error(err);
    } else {
      this.setState({
        term: ''
      });
    }
  };

  render() {
    const {term} = this.state;
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={term} onChange={this.handleChange}/>
      <button onClick={this.handleSearch}> Add Repos </button>
    </div>) ;
  };
}

export default Search;
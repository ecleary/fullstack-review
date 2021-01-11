import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      notFound: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
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

  handleRemove(e) {
    e.preventDefault();
    const {term} = this.state;
    const {onRemove} = this.props;
    onRemove(term, this.clearInput);
  };

  clearInput(err) {
    if (err) {
      this.setState({
        notFound: true
      });
      setTimeout(() => {
        this.setState({
          notFound: false
        });
      }, 3000);
    } else {
      this.setState({
        term: ''
      });
    }
  };

  render() {
    const {term, notFound} = this.state;
    return (<div>
      <h4>Add more repos!</h4>
      <table>
        <tbody>
          <tr>
            <td style={{verticalAlign: 'top'}}>
              Enter a GitHub username:
            </td>
            <td style={{verticalAlign: 'top'}}>
              <input value={term} onChange={this.handleChange}/>
              <br />
              {notFound ? <span style={{color: 'red'}}>Username not found</span> : null}
            </td>
            <td style={{verticalAlign: 'top'}}>
              <button onClick={this.handleSearch}> Add Repos </button>
              <button onClick={this.handleRemove}> Remove Repos </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>) ;
  };
}

export default Search;
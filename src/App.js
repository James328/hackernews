import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: 'Vue.js',
    url: 'https://github.com/reactjs/redux',
    author: 'James',
    num_comments: 6,
    points: 1,
    objectID: 2,
  }
];

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
        <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

// ES6 class component for Search
// class Search extends Component {
//   render() {
//     const { value, onChange, children } = this.props;
//     return (
//       <form>
//         {children} <input type="text" value={value} onChange={onChange} />
//       </form>
//     );
//   }
// }

/**
 * Note: once you would need access to its internatl component state or 
 * lifecycle methods, you would refactor the below snippet into the above ES6 
 * class component.
 */

// The above Search component, refactored to lightweight functional stateless component
const Search = ({ value, onChange, children }) =>
  <form>
    {children} <input type="text" value={value} onChange={onChange} />
  </form>

// ES6 sugar search function
const isSearched = (searchTerm) => (item) => !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

const Table =({ list, pattern, onDismiss }) =>
      <div className="table">
      { list.filter(isSearched(pattern)).map((item) =>
        <div key={item.objectID} className="table-row">
          <span style={{ width: '40%' }}>
            {item.objectID}&nbsp;
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={{ width: '30%' }}>
            {item.author}
          </span>
          <span style={{ width: '10%' }}>
            {item.num_comments}
          </span>
          <span style={{ width: '10%' }}>
            {item.points}
          </span>
          <span style={{ width: '10%' }}>
            <Button 
              onClick={() => onDismiss(item.objectID)}
              className="button-inline"
            >
              Dismiss
            </Button>
          </span>
        </div>
      )}
      </div>

const Button = ({ onClick, className = '', children }) =>
  <button 
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>

export default App;

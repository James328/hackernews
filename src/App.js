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
];

// ES6 sugar search function
const isSearched = (query) => (item) => !query || item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list,
      query: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    this.setState({ query: event.target.value });
  }

  render() {
    const { query, list } = this.state;
    return (
      <div className="App">
        <Search value={query} onChange={this.onSearchChange}>
          Search
        </Search>
        <Table list={list} pattern={query} />
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
const Search = ({ value, onChange, children }) => {

  // do something

  return (
    <form>
      {children} <input type="text" value={value} onChange={onChange} />
    </form>
  );
}

class Table extends Component {

  render() {
    const { list, pattern } = this.props;
    return (
      <div>
      { list.filter(isSearched(pattern)).map((item) =>
        <div key={item.objectID}>
          <span><a href={item.url}>{item.title}</a></span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
        </div>
      )}
      </div>
    );
  }
}

export default App;

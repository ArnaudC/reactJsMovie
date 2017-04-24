import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data/data.json';

class Movie extends Component {
  render() {
    var movie = this.props.movie;
    return (
      <div>
        <div>{movie.name}</div>
        <img src={movie.picture} alt={movie.name}/>
      </div>
    );
  }
}

class Category extends Component {
    render() {
      var category = this.props.category;
      var movies = category.movies;
      return (
        <div>
          <div className="categoryName">{category.categoryName}</div>
          <div>
            <ul className="movieUL">
              {movies.map(movie => {
                return (
                  <li className="movieLI" key={movie.id}>
                    <Movie movie={movie}/>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      );
    }
}

class CategoryList extends Component {
  render() {
    var categories = this.props.categories;
    return(
      <div>
        <ul className="categoryUL">
          {categories.map(category => {
            return (
              <li className="categoryLI" key={category.id}>
                <Category category={category}/>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.onFilterTextInput = this.handleFilterTextInputChange.bind(this);
  }

  handleFilterTextInputChange(e) {
    this.props.onFilterTextInput(e.target.value);
  }

  render() {
    return (
      <form>
        <input type="text" placeholder="Search a movie name ..." onChange={this.onFilterTextInput} />
      </form>
    );
  }
}

class FilterableCategoryList extends Component {
  constructor(props) {
    super(props);
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.state = {
      searchText : ''
    }
  }

  handleFilterTextInput(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  /*
  * Filter the movie list with the filterText.
  */
  filterMovies() {
    var data = this.props.data;
    var filterText = this.state.filterText;
    if (filterText === undefined || filterText === '') {
      return data;
    }
    var finalCategoryList = [];
    data.forEach(category => {
      var finalMovieList = category.movies.filter(movie => {
        return movie.name.toUpperCase().includes(filterText.toUpperCase());
      });
      if (finalMovieList.length !== 0) {
        finalCategoryList.push({
          categoryName: category.categoryName,
          movies: finalMovieList
        });
      }
    });
    return finalCategoryList;
  }

  render() {
    var categories = this.filterMovies();
    return(
      <div>
        <SearchBar
          filterText={this.state.filterText}
          onFilterTextInput={this.handleFilterTextInput}
        />
        <CategoryList
          categories={categories} />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>View a movie</h2>
        </div>
        <p className="App-intro">
          This is a simple list of <code>movies</code> !
        </p>
        <FilterableCategoryList data={data}/>
      </div>
    );
  }
}

export default App;

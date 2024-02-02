import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  country='in';
  pageSize = 9;
  apiKey = process.env.REACT_APP_NEWS_API_KEY;
  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar color='#f11946' progress={this.state.progress} />
          <Routes>
            <Route exact path="/home" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' country={this.country} category='general' pageSize={this.pageSize} />}/>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='sports' country={this.country} category='sports' pageSize={this.pageSize} />}/>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='entertainment' country={this.country} category='entertainment' pageSize={this.pageSize} />}/>
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='health' country={this.country} category='health' pageSize={this.pageSize} />}/>
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='business' country={this.country} category='business' pageSize={this.pageSize} />}/>
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='science' country={this.country} category='science' pageSize={this.pageSize} />}/>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='technology' country={this.country} category='technology' pageSize={this.pageSize} />}/>
          </Routes>
        </Router>
      </div>
    )
  }
}

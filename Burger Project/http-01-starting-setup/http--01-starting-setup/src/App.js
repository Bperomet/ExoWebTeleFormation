import React, { Component, Suspense } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
//npm install --save react-router  react-router-dom
import Blog from './containers/Blog/Blog';

//Lazy loading version rect 16.6 
const Posts = React.lazy(()=>{return import('./containers/Blog/Posts/Posts')});

class App extends Component {

  state = {
    showPosts: false
  }

  modeHandler = ()=>{
    this.setState(prevState=>{
      return {showPosts: !prevState.showPosts};
    });
  }

  render() {
    return (
/**
 * <button onClick={this.modeHandler}>Toggle Mode <button/>
 * {this.state.showPosts? (<Suspense fallback={<div>Loading...</div>}><Posts/></Suspense>):<User/>}
 * 
 */

 //basename pour le déployment
      <BrowserRouter basename="/my-app">
        <div className="App">
          <Blog />
        </div>
        <Route path="/posts" render={()=><Suspense fallback={<div>Loading...</div>}><Posts/></Suspense>}/>
      </BrowserRouter>

    );
  }
}

export default App;

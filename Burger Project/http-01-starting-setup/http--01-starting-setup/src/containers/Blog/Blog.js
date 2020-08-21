import React, { Component } from 'react';
//import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import classes from './Blog.module.css';
import Posts from './Posts/Posts';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom'; //ou Link   //switch pour charger juste 1 route

//import feignant import que si bs
import asyncComponent from '../../hoc/asyncComponent';
//import NewPost from '../../components/NewPost/NewPost';

const AsyncNewPost = asyncComponent(()=>{
    return import('../../components/NewPost/NewPost');
});

class Blog extends Component {
    state={
        auth: false
    }
    render () {
        return (
            <div className= {classes.Blog}>
                <header>
                    <ul>
                        {/*Utilisation de link a la place de a pour eviter le rechargement de la page*/}
                        <li><NavLink to='/' exact activeClassName='my-active' activeStyle={{color: '#fa923f', textDecoration: 'underline'}}>Home</NavLink></li>
                        <li><NavLink to={{
                            //pathname:'this.props.match+/new-post'           chemin dynamique
                            pathname:'/new-post',// le / pour dire que c'est un chemin absolut
                            hash:'#submit',
                            search:'?quick-submit=true'}}>New Post</NavLink></li>
                    </ul>
                </header>
               {/*<Route path="/" exact render={()=><h1>HOME</h1>}/>*/}
               <Route path="/" exact component={Posts}/>
               <Switch>
                        <Route path="/new-post" exact component={AsyncNewPost/*NewPost*/}/>                    
                    <Route path="/:id" exact component={FullPost}/>{/**:id en dernier sinon impossible d'avoir les autres routes */}
                    {/** <Redirect from="/" to="/1"/> */}
                    <Route render={()=><h1>NOT FOUND</h1>}/>
               </Switch>
            </div>
        );
    }
}
/*
                <Posts/>

                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
                                <section className="Posts">
                    {posts}
                </section>
*/
export default Blog;
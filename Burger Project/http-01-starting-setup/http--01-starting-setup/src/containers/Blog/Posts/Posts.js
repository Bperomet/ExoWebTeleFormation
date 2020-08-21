import React,{Component} from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import classes from './Posts.module.css';
import {Route ,Link} from 'react-router-dom';
import FullPost from '../../../components/FullPost/FullPost';

class Posts extends Component{
    state = {
        posts:[],
        //selectedPostId: null,
        //error: false
    }

    componentDidMount(){
        axios.get('/posts')
        .then(response =>{
            const posts =response.data.slice(0,4);
            const updatedPosts = posts.map(post=>{
                return{
                    ...post,
                    author: 'Max'
                }
            });
            this.setState({posts: updatedPosts});
          //  this.setState({posts: response.data});
        })
        .catch(error=>{
            console.log(error);
           // this.setState({error: true});
        });
    }

    postSelectedHandler = (id) =>{
        this.props.history.push({pathname: '/'+id});
       // this.setState({selectedPostId: id});
    }

    render(){
        let posts = <p>Something went wrong</p>

        if(!this.state.error){
            posts = this.state.posts.map((post)=>{
                return (
               // <Link to={'/'+post.id}  >
                    <Post 
                    key={post.id}
                    title={post.title} 
                    author={post.author}
                    clicked={()=>this.postSelectedHandler(post.id)}/>
              //  </Link>
              );
            });
        }

        return (
            <div>
                <section className={classes.Posts}>
                    {posts}
                </section>
                {/**<Route path="/:id" exact component={FullPost}/>
                 * pour imbriquer des routes
                 * :id en dernier sinon impossible d'avoir les autres routes */}
            </div>

        );

    }
    
}

export default Posts;
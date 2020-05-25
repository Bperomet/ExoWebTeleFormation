import React,{Component} from 'react';
import ProfilUser from './ProfilUser';
import NavigatorBar from './NavigatorBar';

export default class UsersArray extends Component{

    constructor(props){
        super(props);
    
        this.state ={
          users: [],
          user: null
        }
    }

    loginLogout =()=>{
        this.props.loginLogout();
        this.props.history.push("/");
    }

    clickModify = (e)=>{

        //this.props.history.push("/users/"+e.target.id);
        fetch('http://localhost:9500/users/'+e.target.id,
        {
            method:"GET",
            mode: "cors", 
        })
        .then((res)=>{ 
            if(res.status ===200){
                return res.json();
            }
            else{
                throw new Error("Selection impossible"); 
            }
        })
        .then((data)=>{
            console.log(data);
            this.setState({user: data},()=>this.props.history.push("/users/"+data.id));
        })
        .catch(console.log)
    }

    clickDelete = (e)=>{
        fetch('http://localhost:9500/delete/'+e.target.id,
        {
            method:"GET",
            mode: "cors", 
        })
        .then((res)=>{ 
            console.log(res.status);
            if(res.status ===200){
                return res.json();
            }
            else{
                throw new Error("Suppression impossible"); 
            }
        })
        .then((data)=>{
            var array = this.state.users.filter(item => item.id != data.id);
            this.setState({users: array},()=>console.log(this.state.users)); 
        })
        .catch(console.log)
    }
    componentDidMount()
    { 
        fetch('http://localhost:9500/users',
        {
            method:"GET",
            mode: "cors", 
        })
        .then((res)=>{ 
            if(res.status ===200){
            return res.json();
            }
            else{
                throw new Error("Plus de grains de cafés"); 
            }
        })
        .then((data)=>{
            this.setState({users: data});
        })
        .catch(console.log)
    }

    submitUpdate = (e) =>{ 
        e.preventDefault();

        fetch('http://localhost:9500/users/',
        {
            method:"GET",
            mode: "cors", 
        })
        .then((res)=>{ 
            if(res.status ===200){
            return res.json();
            }
            else{
                throw new Error("Plus de grains de cafés"); 
            }
        })
        .then((data)=>{
            this.setState({user: data});
        })
        .catch(console.log)
    }


    changeUpdate = (e)=> {
        this.setState({[e.target.id]: e.target.value});
    }

    render() {

      return(

        <div>
            <NavigatorBar loginLogout={this.loginLogout}/>       
            {this.state.users.length > 0 && this.state.user === null? 
            <table>
                <thead key="thead">
                    <tr> 
                        {Object.keys(this.state.users[0]).map((head)=>head !=="password"?
                        <td key={head} >{head}</td> :   null)}
                        <td key={"headmodifier"}>modifier</td>
                        <td key={"headsupprimer"}>supprimer</td>
                    </tr>
                </thead>
                <tbody key="tbody">
                        {
                            Object.keys(this.state.users).map((i)=>
                            <tr key={i+"row"}>
                                <td key={this.state.users[i].id+"id"}>{this.state.users[i].id}</td>
                                <td key={this.state.users[i].id+"firstname"}>{this.state.users[i].firstname}</td>
                                <td key={this.state.users[i].id+"lastname"}>{this.state.users[i].lastname}</td>
                                <td key={this.state.users[i].id+"email"}>{this.state.users[i].email}</td>
                                <td key={this.state.users[i].id+"role"}>{this.state.users[i].role}</td>
                                <td key={this.state.users[i].id+"description"}>{this.state.users[i].description}</td>
                                <td key={this.state.users[i].id+"modifier"}><button  id={this.state.users[i].id} onClick={this.clickModify}>modifier</button></td>
                                <td key={this.state.users[i].id+"supprimer"}><button  id={this.state.users[i].id} onClick={this.clickDelete}>supprimer</button></td>
                            </tr>
                        )}
                </tbody>
            </table>
            : 
                <h5>Chargement...</h5>
            }
        </div>

        );
    }
}
// <ProfilUser   user={this.state.user} submitUpdate={this.submitUpdate} changeUpdate={this.changeUpdate} />
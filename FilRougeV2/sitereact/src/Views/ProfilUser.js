import React,{Component} from 'react';

export default class ProfilUser extends Component{

    constructor(props){
        super(props);
    
        this.state ={
          user: null,
 
        }
    }

    componentDidMount(){
        if(this.props.user !== null){
           this.setState({user: this.props.user})
        }
        else{
            fetch('http://localhost:9500/users/'+this.props.match.params.id,
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
                
                this.setState({user: data});
            })
            .catch(console.log)
        }
    }

    submitUpdate = (e) =>{ 
        e.preventDefault();
        fetch('http://localhost:9500/update/'+this.props.match.params.id,
        {
            method:"POST",
            mode: "cors", 
            headers: {
               "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    'id': this.state.user.id,
                    'email': this.state.user.email, 
                    'firstname': this.state.user.firstname,
                    'lastname': this.state.user.lastname,
                    'password': this.state.user.password,
                    'description': this.state.user.description,
                }
            ) 
        })
        .then((res)=>{ 
            if(res.status ===200){
            return res.json();
            }
            else{
                throw new Error("Impossible de modifier la provenance des grains de cafés"); 
            }
        })
        .then((data)=>{
            this.setState({user: data});
        })
        .catch(console.log)
    }


    change = (e)=> {
        var tab = this.state.user;
        for(var v in tab){
            if(v === e.target.id){
                tab[v] = e.target.value
            }
        }
        this.setState({user: tab});
        console.log(this.state.user);
    }

    render() {
    //console.log(props.user)
        return(
        <div className="App">
            {this.state.user!==null?              
                <form id="FormAddUser" onSubmit={this.submitUpdate}>
                    <div>
                        <label htmlFor="email"> Email :</label>
                        <input type="text" id="email" value={this.state.user.email} onChange={this.change}/>
                    </div>
                    <div>
                        <label htmlFor="password"> Password :</label>
                        <input type="password" id="password" value={this.state.user.password} onChange={this.change}/>
                    </div>
                    <div>
                        <label htmlFor="firstname"> Firstname :</label>
                        <input type="text" id="firstname" value={this.state.user.firstname} onChange={this.change}/>
                    </div>
                    <div>
                        <label htmlFor="lastname"> Lastname :</label>
                        <input type="text" id="lastname" value={this.state.user.lastname} onChange={this.change}/>
                    </div>
                    <div>
                        <label htmlFor="description"> Description :</label>
                        <input type="text" id="description" value={this.state.user.description} onChange={this.change}/>
                    </div>
                    <button type="submit" value="modify" >Modifier</button>
                </form>

            :
                
                <p>Utilisateur introuvable</p>}
            <button value="return" >Retour</button>

        </div>
        );
    }
}

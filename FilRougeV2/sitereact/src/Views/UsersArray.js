import React,{Component} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

export default class UsersArray extends Component{

    constructor(props){
        super(props);
    
        this.state ={
          users:null
        }
      }

    getUsers = () => {
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
            console.log(data);

            this.setState({users: data});
        })
        .catch(console.log)
    }
    componentDidMount(){

    }
    
    render() {
    const columns = [{
        Header: 'Id',
        accessor: 'id'
    },{
        Header: 'Firstname',
        accessor: 'firstname'
    },{
        Header: 'Lastname',
        accessor: 'lastname'
    },{
        Header: 'Email',
        accessor: 'email'
    },{
        Header: 'Password',
        accessor: 'password'
    },{
        Header: 'Role',
        accessor: 'role'
    }];
      return(
 
            <ReactTable
                columns={columns}
                data = {this.getUsers}
            >
                
            </ReactTable>
        );
    } 
}

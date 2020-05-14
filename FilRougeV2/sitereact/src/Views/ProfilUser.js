import React from 'react';

function change  (e){

}

const ProfilUser = props =>{
    return(
        <div className="App">
            <form id="FormAddUser" onSubmit={this.submitUpdate}>
            <div id="divEmail">
                <input type="text" id="email" value={props.user.email}  onChange={this.change}/>
            </div>
            <div>
                <input type="password" id="password" value={props.user.password} onChange={this.change}/>
            </div>
            <div>
                <input type="text" id="firstname" value={props.user.firstname} onChange={this.change}/>
            </div>
            <div>
                <input type="text" id="lastname" value={props.user.lastname} onChange={this.change}/>
            </div>
            <div>
                <input type="text" id="description" value={props.user.description} onChange={this.change}/>
            </div>
            <button type="submit" value="Add" >Créer</button>
            </form>
        </div>
    );
    
}
export default ProfilUser;
import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{

        state = {
            error: null
        }

        componentWillMount(){
            this.reqInterceptors = axios.interceptors.request.use(req=>{
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res=> res, error=>{
                this.setState({error: error});
            });
        }
//pour empecher les fuites de memoire , detruire les intercepteurs au demontage
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = ()=>{
            this.setState({error: null});
        }

        render(){
            return(
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler} clicked={this.errorConfirmedHandler}>
                        {this.state.error? this.state.error.message: null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    }
}

export default withErrorHandler;
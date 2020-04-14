import React, { Component } from 'react';
import {connect} from 'react-redux';

import Input from './../../components/UI/Input/Input';
import Button from './../../components/UI/Button/Button';
import classes from './Auth.css';
import * as action from './../../store/actions/index';
import Spinner from './../../components/UI/Spinner/Spinner';

class Auth extends Component {
    state={
        controls:{
            email:{
                elementtype: 'input',
                elementconfig: {
                    type:'email',
                    placeholder:'Your E-Mail'
                },
                value: '',
                validation:{
                    required:true
                },
                valid: false
            },
            password:{
                elementtype: 'input',
                elementconfig: {
                    type:'password',
                    placeholder:'Your Password'
                },
                value: '',
                validation:{
                    required:true,
                    minlength: 8,
                    maxlength: 8
                },
                valid: false
            }
        },
        issignup: true
    }

    checkvalidity(value, rules){
        let isvalid = false;

        if(!rules){
            return true;
        }

        if(rules.requires){
            isvalid = value.trim() !== '' && isvalid
        }

        if(rules.minLength){
            isvalid = value.length >= rules.minLength && isvalid
        }

        if(rules.maxLength){
            isvalid = value.lenght <= rules.maxLength && isvalid 
        }

        return isvalid;
    }

    submithandler = (event) =>{
        event.preventDefault();
        console.log('hiiii');
        this.props.onauth(this.state.controls.email.value,this.state.controls.password.value,this.state.issignup);
    }

    inputchangehandler = (event,controlname) =>{
        const updatedcontrols ={
            ...this.state.controls,
            [controlname]: {
                ...this.state.controls[controlname],
                value: event.target.value,
                valid: this.checkvalidity(event.target.value, this.state.controls[controlname].validation)
            }
        }
        this.setState({controls: updatedcontrols})
    }

    switchauthmodehandler = () =>{
        this.setState(prevstate =>{
            return {issignup: !prevstate.issignup}
        })
    }

    render(){
        const formelementarray = [];
        for(let key in this.state.controls){
            formelementarray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = <Spinner/>
        if(!this.props.loading){
            form=(
                <div className={classes.Authdata}>
                <form onSubmit={this.submithandler}>
                {formelementarray.map(formelement =>(
                    <Input
                        key = {formelement.id}
                        elementtype = {formelement.config.elementtype}
                        elementconfig = {formelement.config.elementconfig}
                        value = {formelement.value}
                        changed= {(event) => this.inputchangehandler(event , formelement.id)}
                    />
                ))}
                <Button btntype="Success">Submit</Button>
                </form>
                <Button clicked={this.switchauthmodehandler}  btntype="Danger">Switch to {this.state.issignup ? 'SignIn' : 'SignUp'} </Button>
                </div>
            )
        }
        return(
            <div>
            {form}
            </div>

        )
    }
}

const mapStateToProps = state =>{
    return{
        loading: state.auth.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onauth: (email, password, isSignUp) => dispatch(action.auth(email,password, isSignUp))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth) ;
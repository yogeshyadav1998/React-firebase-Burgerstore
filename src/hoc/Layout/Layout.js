import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../Auxs/Auxs';
import classes from './Layout.css';
import Toolbar from './../../components/Navigation/Toolbar/Toolbar'
import Sidedrawer from './../../components/Navigation/Sidedrawer/Sidedrawer'

class Layout extends Component {
    state =  {
        showsidedrawer: false
    }

    sidedrawerclosedhandler = () => {
        this.setState({showsidedrawer: false});
    }

    sidedrawertogglehandler = () => {
        this.setState((prevState) =>{
            return {
                showsidedrawer: !prevState.showsidedrawer
            }
        });
    }

    render (){
        return(
            <Aux>
            
            <Toolbar isauth = {this.props.isauth}
                    drawertoggleclicked={this.sidedrawertogglehandler}/>
                <Sidedrawer open={this.state.showsidedrawer} closed={this.sidedrawerclosedhandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state =>{
    return{
        isauth: state.auth.token != null
    };
}

export default connect(mapStateToProps)(Layout);
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as action from './../../../store/actions/index';

class logout extends Component{

    componentDidMount () {
        this.props.onlogout();
    }

    render(){
        return <Redirect to='/'/>
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onlogout: () => dispatch(action.logout())
    }
}

export default connect(null,mapDispatchToProps)(logout);
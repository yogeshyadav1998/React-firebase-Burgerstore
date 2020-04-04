import React, {Component} from 'react';

import Aux from '../Auxs/Aux';
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
            <Toolbar drawertoggleclicked={this.sidedrawertogglehandler}/>
                <Sidedrawer open={this.state.showsidedrawer} closed={this.sidedrawerclosedhandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;
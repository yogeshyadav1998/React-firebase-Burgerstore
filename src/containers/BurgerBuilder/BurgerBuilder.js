import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index';
import axios from '../../axiosorders';

import Aux from '../../hoc/Auxs/Auxs';
import Burger from '../../components/Burger/Burger';
import Buildcontrols from '../../components/Burger/Buildcontrols/Buildcontrols';
import Modal from '../../components/UI/Modal/Modal';
import Ordersummary from '../../components/Burger/Ordersummary/Ordersummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/Witherrorhandler/Witherrorhandler';



class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentDidMount () {
        this.props.onfetchingredients();
        console.log(this.props.ingredients);
    }

    updatepurchasestate(ingredients) { 
        const sum = Object.keys(ingredients)
            .map(igkey =>{
                return ingredients[igkey];
            })
            .reduce((sum,el) => {
                return sum + el;
            }, 0);

        return sum >0;
    }
     
    purchasehandler = () => {
        this.setState({purchasing : true});
    }

    purchasecancelhandler = () => {
        this.setState({purchasing : false});
    }

    purchasecontinuehandler = () => {
        this.props.oninitorderburger();
        this.props.history.push('/checkout')
    }

    render () {
        const disabledinfo = {
            ...this.props.ingredients
        } 
        for (let key in disabledinfo) {
            disabledinfo[key] = disabledinfo[key]<=0
        } 

        let ordersummary = null;
        let burger = <Spinner/>;
        if(this.props.ingredients){
            burger = (
                <Aux>
                <Burger ingredients={this.props.ingredients} />
                <Buildcontrols 
                    ingredientadded = {this.props.onaddingredient}
                    ingredientremoved = {this.props.onremoveingredient} 
                    disabled = {disabledinfo} 
                    purchasable = {this.updatepurchasestate(this.props.ingredients)}
                    ordered = {this.purchasehandler}
                    price = {this.props.totalprice} />
                </Aux>
            );
            ordersummary = <Ordersummary 
                        ingredients = {this.props.ingredients}
                        totalprice = {this.props.totalprice}
                        purchasecancelled={this.purchasecancelhandler}
                        purchasecontinued={this.purchasecontinuehandler} />
        }

        return (
            <Aux>
                <Modal  show={this.state.purchasing} 
                        modalclosed = {this.purchasecancelhandler}>
                    {ordersummary}
                </Modal>  
                {burger}
            </Aux>
        );
    }
}

const mapStateToPorps = state =>{
    return {
        ingredients: state.burgerbuilder.ingredients,
        totalprice: state.burgerbuilder.totalprice,
        error: state.burgerbuilder.error
    };
}
 
const mapDispatchToProps = dispatch =>{
    return{
        onaddingredient: (ingredientname) => dispatch(action.addingredient(ingredientname)),
        onremoveingredient: (ingredientname) => dispatch(action.removeingredient(ingredientname)),
        onfetchingredients: () => dispatch(action.fetchingredients()),
        oninitorderburger: () => dispatch(action.initorderburger())
    };
}

export default connect(mapStateToPorps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios)) ;
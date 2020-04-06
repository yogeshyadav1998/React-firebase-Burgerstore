import React, { Component } from 'react';
import axios from '../../axiosorders';
import {connect} from 'react-redux';
import * as actiontype from './../../store/actions';

import Aux from '../../hoc/Auxs/Auxs';
import Burger from '../../components/Burger/Burger';
import Buildcontrols from '../../components/Burger/Buildcontrols/Buildcontrols';
import Modal from '../../components/UI/Modal/Modal';
import Ordersummary from '../../components/Burger/Ordersummary/Ordersummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/Witherrorhandler/Witherrorhandler';



class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false
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
        const ingredientparams = [];
        for(let i  in this.state.ingredients) {
            ingredientparams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        ingredientparams.push('price=' + this.state.totalprice);
        const ingredientstring = ingredientparams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search:'?' + ingredientstring
        });
    }

    render () {
        const disabledinfo = {
            ...this.props.ingredients
        }
        for (let key in disabledinfo) {
            disabledinfo[key] = disabledinfo[key] <=0
        } 

        let ordersummary = null;
        
        let burger = <Spinner/>
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
        
        if(this.state.loading){
            ordersummary = <Spinner/>
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
        ingredients: state.ingredients,
        totalprice: state.totalprice
    };
}
 
const mapDispatchToProps = dispatch =>{
    return{
        onaddingredient: (ingredientname) => dispatch({type: actiontype.ADD_INGREDIENT, ingredientname: ingredientname}),
        onremoveingredient: (ingredientname) => dispatch({type: actiontype.REMOVE_INGREDIENT, ingredientname: ingredientname})
    };
}

export default connect(mapStateToPorps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios)) ;
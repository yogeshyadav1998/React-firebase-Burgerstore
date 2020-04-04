import React, { Component } from 'react';
import axios from '../../axiosorders';

import Aux from '../../hoc/Auxs/Aux';
import Burger from '../../components/Burger/Burger';
import Buildcontrols from '../../components/Burger/Buildcontrols/Buildcontrols';
import Modal from '../../components/UI/Modal/Modal';
import Ordersummary from '../../components/Burger/Ordersummary/Ordersummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/Witherrorhandler/Witherrorhandler';

const ingredient_prices = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients:null,
        totalprice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount(){
        axios.get('https://burgurbuilder-ecde8.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            });
    }

    updatepurchasestate(ingredients) { 
        const sum = Object.keys(ingredients)
            .map(igkey =>{
                return ingredients[igkey];
            })
            .reduce((sum,el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0})
    }

    addIngredienthandler = (type) => {
        const oldcount = this.state.ingredients[type];
        const updatedcount = oldcount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedcount;
        const priceaddition = ingredient_prices[type];
        const oldprice = this.state.totalprice;
        const newprice = oldprice + priceaddition;
        this.setState({totalprice: newprice, ingredients: updatedIngredients});
        this.updatepurchasestate(updatedIngredients);
    }
     
    removeIngredienthandler = (type) => {
        const oldcount = this.state.ingredients[type];
        if(oldcount <= 0)
        {
            return;
        }
        const updatedcount = oldcount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedcount;
        const pricededuction = ingredient_prices[type];
        const oldprice = this.state.totalprice;
        const newprice = oldprice - pricededuction;
        this.setState({totalprice: newprice, ingredients: updatedIngredients});
        this.updatepurchasestate(updatedIngredients);
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
            ...this.state.ingredients
        }
        for (let key in disabledinfo) {
            disabledinfo[key] = disabledinfo[key] <=0
        } 

        let ordersummary = null;
        
        let burger = <Spinner/>
        if(this.state.ingredients){
            burger = (
                <Aux>
                <Burger ingredients={this.state.ingredients} />
                <Buildcontrols 
                    ingredientadded = {this.addIngredienthandler}
                    ingredientremoved = {this.removeIngredienthandler} 
                    disabled = {disabledinfo} 
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchasehandler}
                    price = {this.state.totalprice} />
                </Aux>
            );
            ordersummary = <Ordersummary 
                        ingredients = {this.state.ingredients}
                        totalprice = {this.state.totalprice}
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

export default withErrorHandler(BurgerBuilder, axios) ;
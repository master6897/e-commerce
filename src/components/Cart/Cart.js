import {useState} from 'react';
import styled from "styled-components";
import Button from "../helpers/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 5rem;
    padding: 2rem;
    min-height: 60vh;
    box-sizing: border-box;
`;
const StyledProductContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    border-bottom: 1px solid black;
    padding: 1rem 0;
    box-sizing: border-box;
    @media (max-width: 480px){
        flex-direction: column;
    }
    & div.manipulators{
        display: flex;
        flex-direction: row;
        width: 20%;
        justify-content: space-evenly;
        @media (max-width: 480px){
            width: 50%;
        }
    }
    & div.product{
        display: flex;
        width: 60%;
        align-items: center;
        justify-content: space-evenly;
        @media (max-width: 480px){
            flex-direction: column;
            width: 100%;
            & img{
                width: 70%;
                height: 70%;
            }
    }
    }
`
const Cart = () => {
    const dispatch = useDispatch();
    const cartValue = useSelector(state => state.cart);
    const cart = JSON.parse(localStorage.getItem('cart'));
    
    const plusItemHandler = (product) => {
        dispatch(cartActions.addItemToCart(product))
    }
    const minusItemHandler = (product) => {
        dispatch(cartActions.removeItemFromCart(product));
    }
    return(
        <StyledContainer>
            <h1>Cart</h1>
            {!cart && <h1>Nothing in the cart.</h1>}
            {cart && cartValue.products.map((product) => (
                <StyledProductContainer key={product.id}>
                    <div className='product'>
                        <img src={product.image} alt={product.name} width={'20%'} height={'20%'}/>
                        <h1>{product.name}</h1>
                        <h3>{product.price} $</h3>
                    </div>
                    <div className='manipulators'>
                        <Button value='-' onClick={() => minusItemHandler(product)}/>
                        <h3>{product.amount}</h3>
                        <Button value='+' onClick={() => plusItemHandler(product)}/>
                    </div>
                </StyledProductContainer>
            ))}
            {cart && <h1>Total cost: {cartValue.totalCost.toFixed(2)} $</h1>}
        </StyledContainer>
    )
}
export default Cart;
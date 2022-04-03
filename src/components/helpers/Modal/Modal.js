import styled, {css, keyframes} from "styled-components";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth-slice";
import { cartActions } from "../../../store/cart-slice";
import { useSelector } from "react-redux";

const animation = keyframes`
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
`;

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    ${props => props.animate && css`
        & div.animation{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 20rem;
            &:after{
                content: " ";
                display: block;
                width: 64px;
                height: 64px;
                margin: 8px;
                border-radius: 50%;
                border: 6px solid #fff;
                border-color: var(--first) transparent var(--first) transparent;
                animation: ${animation} 1.2s linear infinite;
            }
        }
    `}
    ${props => props.info && css`
        & div.info{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 90%;
            height: 20rem;
            border: 1px solid black;
            border-radius: 20px;
            overflow: hidden;
            & h1{
                display: flex;
                height: 30%;
                width:100%;
                align-items: center;
                justify-content: center;
                background: var(--first);
                margin: 0;
            }
            & h3{
                display: flex;
                height: 50%;
                width:100%;
                align-items: center;
                justify-content: center;
                margin: 0;
            }
            & div.button-container{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 20%;
                width:100%;
            }
        }
    `}
`

const Modal = (props) => {
    const user = useSelector(state => state.auth);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = () => {
        dispatch(authActions.logout());
        navigate('/login');
    }
    const clearCart = () => {
        dispatch(cartActions.clearCart());
        console.log(cart);
        if(user.email === '' || user.email === undefined){
            navigate('/products');
        }else{
            navigate('/profile');
        }
    }
    return(
        <StyledContainer animate={props.animate} info={props.info} fail={props.fail} registered={props.registered}>
            {props.animate && (
                <div className='animation'>

                </div>
            )}
            {props.info && (
                <div className='info'>
                    <h1>Info</h1>
                    <h3>{props.message}</h3>
                    <div className='button-container'>
                        {((!props.registered && !props.fail && !props.passChanged && !props.photo && !props.orderError && !props.orderSuccess) || props.logged) && <Button value='Okay' onClick={() => navigate('/products')}/>}
                        {(props.fail || props.photo) && <Button value='Okay' onClick={() => navigate(0)}/>}
                        {props.registered && <Button value='Okay' onClick={() => navigate('/login')} />}
                        {props.orderError && <Button value='Okay' onClick={() => navigate('/cart')} />}
                        {props.orderSuccess && <Button value='Okay' onClick={clearCart}/>}
                        {props.passChanged && <Button value='Okay' onClick={logoutHandler} />}
                    </div>
                </div>
            )}
        </StyledContainer>
    )
}
export default Modal;
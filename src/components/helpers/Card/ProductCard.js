import styled, {css} from "styled-components";
import Button from "../Button/Button";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    width: 30%;
    align-items: center;
    border: 1px solid black;
    border-radius: 10px;
    overflow: hidden;
    margin: 2rem;
    transition: 0.3s;
    ${props => props.details && css`
        width: 90%;
        flex-direction: row;
        box-sizing: border-box;
        -webkit-box-shadow: 0px 3px 24px 0px rgba(66, 68, 90, 1);
        -moz-box-shadow: 0px 3px 24px 0px rgba(66, 68, 90, 1);
        box-shadow: 0px 3px 24px 0px rgba(66, 68, 90, 1);
    `}
    @media (max-width: 480px){
        width: 90%;
        margin: 2rem 0;
        flex-direction: column;
    }
    & div.photo{
        height: 10rem;
        width: 100%;
        display: flex;
        transition: 0.3s;
        ${props => props.image && css`
            background-image: url(${props.image});
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
        `};
        ${props => props.details && css`
            width: 90%;
            background-size: contain;
        `}
    }
    & div.details{
        padding: 1rem 0;
        ${props => props.details && css`
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            text-align: left;
            width: 80%;
            padding: 1rem;
            text-align: justify;
        `}
        & button{
            margin: 0 2rem;
        }
    }
    &:hover{
        -webkit-box-shadow: 0px 3px 24px 0px rgba(66, 68, 90, 1);
        -moz-box-shadow: 0px 3px 24px 0px rgba(66, 68, 90, 1);
        box-shadow: 0px 3px 24px 0px rgba(66, 68, 90, 1);
        & div.photo{
            transform: scale(1.1);
            cursor: pointer;
            ${props => props.details && css`
                transform: scale(1.0);
                cursor: default;
            `}
        }
    }
`;

const ProductCard = (props) => {
    const addProductToCartHandler = (product) =>{
        const data = {
            amount: 1,
            ...product
        }
        props.addItemToCart(data);
    }
    return(
        <StyledContainer image={props.image} details={props.details}>
            <div className='photo' onClick={props.redirectHandler}>
            </div>
            <div className='details'>
                <h1>{props.title}</h1>
                {props.details && <p>{props.description}</p>}
                <p>{props.price} $</p>
                <Button value='Add to cart' onClick={() => addProductToCartHandler(props.product)}/>
            </div>
        </StyledContainer>
    )
}

export default ProductCard;
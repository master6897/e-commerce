
import { useParams } from "react-router-dom";
import ProductCard from "../helpers/Card/ProductCard";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const StyledSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5rem;
    min-height: 60vh;
    @media (max-width: 480px){
        flex-direction: column;
    }
`
const ProductDetails = () => {
    const dispatch = useDispatch();
    let { id } = useParams();
    const products = JSON.parse(localStorage.getItem('products'));
    const product = products.find((item) => item.id === id);

    const addToCartHandler = (product) =>{
        dispatch(cartActions.addItemToCart(product));
    }
    return(
        <StyledSection>
           <ProductCard 
               title={product.name}
               description={product.description}
               price={product.price}
               image={product.image}
               details
               product={product}
               addItemToCart={addToCartHandler}
           />
        </StyledSection>
    )
}

export default ProductDetails;
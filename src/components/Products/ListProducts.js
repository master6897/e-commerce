
import ProductCard from "../helpers/Card/ProductCard";
import Modal from "../helpers/Modal/Modal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { useEffect, useState } from "react";

const ListProducts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const products = useSelector(state => state.ui.products);

    const redirectHandler = (id) => {
        navigate(`/products/details/${id}`);
    }

    const addProductToCartHandler = (product) =>{
        const data = {
            amount: 1,
            ...product
        };
        dispatch(cartActions.addItemToCart(data));
    }
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    })
    return(
        <>
            {!isLoading && products.map((product) => (
                <ProductCard
                    key={product.id}
                    title={product.name}
                    description={product.description}
                    price={product.price}
                    image={product.image}
                    id={product.id}
                    redirectHandler={() => redirectHandler(product.id)}
                    addItemToCart={() => addProductToCartHandler(product)}
                    list
                 />
            ))}
            {isLoading && <Modal animate />}
        </>
    )
}
export default ListProducts;
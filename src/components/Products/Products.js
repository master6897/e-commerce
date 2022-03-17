import { useCallback, useEffect } from 'react';
import { uiActions } from '../../store/ui-slice';
import {useDispatch} from 'react-redux';
import styled from "styled-components";
import useHttp from '../hooks/use-http';
import Modal from '../helpers/Modal/Modal';
import ListProducts from './ListProducts';

const StyledSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    margin-top: 5rem;
    padding: 2rem;
    box-sizing: border-box;
    @media (max-width: 480px){
        flex-direction: column;
    }
`

const Products = () => {
    const dispatch = useDispatch();
    const applyData = useCallback((data) => {
        let productsArray = [];
        for(const key in data){
            productsArray.push({
                id: key,
                ...data[key],
            });
        }
        console.log(productsArray);
        dispatch(uiActions.addItemsToStore(productsArray));
        localStorage.setItem('products', JSON.stringify(productsArray));
    }, [dispatch]);
    const {isLoading, error, isDone, sendRequest: fetchProducts} = useHttp(applyData);

    useEffect(() => {
        fetchProducts({
            url: 'https://e-commerce-35f70-default-rtdb.europe-west1.firebasedatabase.app/products.json'
        });
    }, [fetchProducts]);
    return(
        <StyledSection>
            {isLoading && <Modal animate/>}
            {isDone && !error && <ListProducts />}
            {isDone && error && <Modal info message='Could not fetch products. Plesase try again later'/>}
        </StyledSection>
    )
}
export default Products;
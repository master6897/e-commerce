import styled from "styled-components";
import NewProductForm from "./NewProductForm";
import Modal from "../helpers/Modal/Modal";
import useHttp from "../hooks/use-http";
import { useState } from "react";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: stretch;
    width: 100%;
    padding: 1rem;
    margin-top: 5rem;
    box-sizing: border-box;
    min-height: 65vh;
`;
const NewProduct = () => {
    const [isLoadingAll, setIsLoadingAll] = useState(false);
    const {isLoading, error, isDone, sendRequest: addProduct} = useHttp();
    return(
        <StyledContainer>
            <h1>Add product</h1>
            {!isLoadingAll && !isDone && <NewProductForm addProduct={addProduct} setIsLoadingAll={setIsLoadingAll}/>}
            {isLoadingAll && <Modal animate/>}
            {isDone && !error && <Modal info message='Product has been added succesfully!'/>}
            {isDone && error && <Modal info message='Could not add the product! Try again.' />}
        </StyledContainer>
    )
}
export default NewProduct;
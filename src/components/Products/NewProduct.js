
import NewProductForm from "./NewProductForm";
import Modal from "../helpers/Modal/Modal";
import useHttp from "../hooks/use-http";
import { useState } from "react";
import Wrapper from "../helpers/Wrapper/Wrapper";

const NewProduct = () => {
    const [isLoadingAll, setIsLoadingAll] = useState(false);
    const {isLoading, error, isDone, sendRequest: addProduct} = useHttp();
    return(
        <Wrapper title={'Add new product'} isLoading={isLoading} isDone={isDone} error={error}>
            {!isLoadingAll && !isDone && <NewProductForm addProduct={addProduct} setIsLoadingAll={setIsLoadingAll}/>}
            {isLoadingAll && <Modal animate/>}
            {isDone && !error && <Modal info message='Product has been added succesfully!'/>}
            {isDone && error && <Modal info message='Could not add the product! Try again.' />}
        </Wrapper>
    )
}
export default NewProduct;
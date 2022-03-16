import React, {useState} from 'react';

import styled from "styled-components";
import Button from '../helpers/Button/Button';
import { storage } from '../../firebase/firebase';
import useHttp from '../hooks/use-http';
import useInput from '../hooks/use-input';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    min-height: 50vh;
    & div{
        width: 90%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        & label{
            width: 50%;
            font-size: 1.2rem;
            font-weight: 600;
        }
        & input, textarea{
            width: 50%;
            padding: .5rem;
            border: 1px solid var(--first);
            border-radius: 5px;
            outline: none;
            &.error{
                background-color: var(--third);
            }
        }
    }
`

const NewProductForm = (props) => {
    //const allInputs = {imgUrl: ''};
   //const [imageAsFile, setImageAsFile] = useState('');
    //const [imageAsUrl, setImageAsUrl] = useState(allInputs);
    //const {isLoading, error, sendRequest: addProduct} = useHttp();

   /* const imageChangeHandler = (evt) => {
        setImageAsFile(evt.target.files[0]);
    }*/
    const {setIsLoadingAll} = props;
    const {
        value: productNameValue,
        isValid: productNameValid,
        isTouched: productNameTouched,
        error: productNameError,
        valueChangeHandler: productNameChangeHandler,
        valueBlurHandler: productNameBlurHandler,
        reset: productNameReset
    } = useInput((item) => item.trim().length > 0);
    const {
        value: productPriceValue,
        isValid: productPriceValid,
        isTouched: productPriceTouched,
        error: productPriceError,
        valueChangeHandler: productPriceChangeHandler,
        valueBlurHandler: productPriceBlurHandler,
        reset: productPriceReset
    } = useInput((item) => item.trim().length > 0);
    const {
        value: productDescrValue,
        isValid: productDescrValid,
        isTouched: productDescrTouched,
        error: productDescrError,
        valueChangeHandler: productDescrChangeHandler,
        valueBlurHandler: productDescrBlurHandler,
        reset: productDescrReset
    } = useInput((item) => item.trim().length > 0);
    const {
        value: productPhotoValue,
        isValid: productPhotoValid,
        isTouched: productPhotoTouched,
        error: productPhotoError,
        valueChangeHandler: productPhotoChangeHandler,
        valueBlurHandler: productPhotoBlurHandler,
        reset: productPhotoReset
    } = useInput((item) => item !== '', true);

    let formIsValid = false;
    if(productNameValid && productPriceValid && productDescrValid && productPhotoValid){
        formIsValid = true;
    }
    const firebaseUploadHandler = async (evt) => {
        if(formIsValid){
            setIsLoadingAll(true);
            evt.preventDefault();
            if(productPhotoValue === ''){
                throw new Error('Wrong photo!');
            }
            const uploadImage = storage.ref(`/images/${productPhotoValue.name}`).put(productPhotoValue);
            uploadImage.on('state_changed', (snapShot) => {
                console.log(snapShot);
            }, (err) => {
                console.log(err);
            }, () => {
                storage.ref('images').child(productPhotoValue.name).getDownloadURL()
                .then(fireBaseUrl => {
                    /*addProduct({
                        url: 'https://e-commerce-35f70-default-rtdb.europe-west1.firebasedatabase.app/products.json',
                        method: 'POST',
                        headers: {
                            'Content-type' : 'application/json'
                        },
                        body: {
                            name: productNameValue,
                            price: productPriceValue,
                            description: productDescrValue,
                            image: fireBaseUrl
                        }
                    });*/
                    props.addProduct({
                        url: 'https://e-commerce-35f70-default-rtdb.europe-west1.firebasedatabase.app/products.json',
                        method: 'POST',
                        headers: {
                            'Content-type' : 'application/json'
                        },
                        body: {
                            name: productNameValue,
                            price: productPriceValue,
                            description: productDescrValue,
                            image: fireBaseUrl
                        }
                    });
                    setIsLoadingAll(false);
                })
            });
            
            productNameReset();
            productPriceReset();
            productDescrReset();
            productPhotoReset();
        }
       
    }

    return(
        <StyledForm onSubmit={firebaseUploadHandler}>
            <div>
                <label>Name of product:</label>
                <input type='text' 
                    value={productNameValue}
                    onChange={productNameChangeHandler}
                    onBlur={productNameBlurHandler}
                    className={productNameTouched && productNameError && 'error'}
                />
            </div>
            {productNameTouched && productNameError && <p style={{color: 'red'}}>Enter valid product name!</p>}
            <div>
                <label>Price:</label>
                <input type='number'
                     value={productPriceValue}
                    onChange={productPriceChangeHandler}
                    onBlur={productPriceBlurHandler}
                    className={productPriceTouched && productPriceError && 'error'}
                 />
            </div>
            {productPriceTouched && productPriceError && <span style={{color: 'red'}}>Enter valid product price!</span>}
            <div>
                <label>Description:</label>
                <textarea cols={20} rows={5}
                    value={productDescrValue}
                    onChange={productDescrChangeHandler}
                    onBlur={productDescrBlurHandler}
                    className={productDescrTouched && productDescrError && 'error'}
                />
            </div>
            {productDescrTouched && productDescrError && <p style={{color: 'red'}}>Description can not be null!</p>}
            <div>
                <label>Photo of the product:</label>
                <input 
                    type='file' 
                    onChange={productPhotoChangeHandler}
                    onBlur={productPhotoBlurHandler}
                    className={productPhotoTouched && productPhotoError && 'error'}
                />
            </div>
            {productPhotoTouched && productPhotoError && <span style={{color: 'red'}}>Pick valid photo!</span>}
            <Button 
                value='Add new product'
                type='submit'
                disabled={!formIsValid}
            />
        </StyledForm>
    )
}
export default NewProductForm;
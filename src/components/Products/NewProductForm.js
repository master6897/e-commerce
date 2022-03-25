import React from 'react';
import Form from '../helpers/Form/Form';
import Button from '../helpers/Button/Button';
import { storage } from '../../firebase/firebase';
import useInput from '../hooks/use-input';


const NewProductForm = (props) => {
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
            }, (err) => {
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
        <Form onSubmit={firebaseUploadHandler}>
            <div className={productNameTouched && productNameError && 'error'}>
                <label>Name of product:</label>
                <input type='text' 
                    value={productNameValue}
                    onChange={productNameChangeHandler}
                    onBlur={productNameBlurHandler}
                    className={productNameTouched && productNameError && 'error'}
                />
            </div>
            {productNameTouched && productNameError && <span>Enter valid product name!</span>}
            <div className={productPriceTouched && productPriceError && 'error'}>
                <label>Price:</label>
                <input type='number'
                     value={productPriceValue}
                    onChange={productPriceChangeHandler}
                    onBlur={productPriceBlurHandler}
                    className={productPriceTouched && productPriceError && 'error'}
                 />
            </div>
            {productPriceTouched && productPriceError && <span>Enter valid product price!</span>}
            <div className={productDescrTouched && productDescrError && 'error'}>
                <label>Description:</label>
                <textarea cols={20} rows={5}
                    value={productDescrValue}
                    onChange={productDescrChangeHandler}
                    onBlur={productDescrBlurHandler}
                    className={productDescrTouched && productDescrError && 'error'}
                />
            </div>
            {productDescrTouched && productDescrError && <span>Product description can not be empty!</span>}
            <div className={productPhotoTouched && productPhotoError && 'error'}>
                <label>Photo of the product:</label>
                <input 
                    type='file' 
                    onChange={productPhotoChangeHandler}
                    onBlur={productPhotoBlurHandler}
                    className={productPhotoTouched && productPhotoError && 'error'}
                />
            </div>
            {productPhotoTouched && productPhotoError && <span>Enter valid image!</span>}
            <Button 
                value='Add new product'
                type='submit'
                disabled={!formIsValid}
            />
        </Form>
    )
}
export default NewProductForm;
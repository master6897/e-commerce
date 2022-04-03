import Wrapper from "../helpers/Wrapper/Wrapper";
import Form from "../helpers/Form/Form";
import Button from "../helpers/Button/Button";
import Modal from "../helpers/Modal/Modal";
import useInput from "../hooks/use-input";
import useHttp from "../hooks/use-http";
import { useSelector } from "react-redux";
import styled from 'styled-components';

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 5rem;
    min-height: 65vh;
`


const OrderForm = () => {
    const cartValue = useSelector(state => state.cart);
    const user = useSelector(state => state.auth);
    const postCodeRegex = /[0-9]{2}-[0-9]{3}/;
    const phoneRegex = /[0-9]{3}-[0-9]{3}-[0-9]{3}/;
    const {
        value: emailValue,
        isValid: emailValid,
        isTouched: emailTouched,
        error: emailError,
        valueChangeHandler: emailChangeHandler,
        valueBlurHandler: emailBlurHandler
    } = useInput((item) => item !== '');
    const {
        value: firstNameValue,
        isValid: firstNameValid,
        isTouched: firstNameTouched,
        error: firstNameError,
        valueChangeHandler: firstNameChangeHandler,
        valueBlurHandler: firstNameBlurHandler
    } = useInput((item) => item !== '');
    const {
        value: secondNameValue,
        isValid: secondNameValid,
        isTouched: secondNameTouched,
        error: secondNameError,
        valueChangeHandler: secondNameChangeHandler,
        valueBlurHandler: secondNameBlurHandler
    } = useInput((item) => item !== '');
    const {
        value: phoneValue,
        isValid: phoneValid,
        isTouched: phoneTouched,
        error: phoneError,
        valueChangeHandler: phoneChangeHandler,
        valueBlurHandler: phoneBlurHandler
    } = useInput((item) => phoneRegex.exec(item));
    const {
        value: postCodeValue,
        isValid: postCodeValid,
        isTouched: postCodeTouched,
        error: postCodeError,
        valueChangeHandler: postCodeChangeHandler,
        valueBlurHandler: postCodeBlurHandler
    } = useInput((item) => postCodeRegex.exec(item));
    const {
        value: cityValue,
        isValid: cityValid,
        isTouched: cityTouched,
        error: cityError,
        valueChangeHandler: cityChangeHandler,
        valueBlurHandler: cityBlurHandler
    } = useInput((item) => item !== '');
    const {
        value: adressValue,
        isValid: adressValid,
        isTouched: adressTouched,
        error: adressError,
        valueChangeHandler: adressChangeHandler,
        valueBlurHandler: adressBlurHandler
    } = useInput((item) => item !== '');

    let isValid = false;
    if(((user.email === '' || user.email === undefined) ? emailValid : true) && firstNameValid && secondNameValid && phoneValid && postCodeValid && cityValid && adressValid){
        isValid = true;
    }

    const {isLoading, error, isDone, sendRequest: makeOrder} = useHttp();
    const makeOrderHandler = async (evt) => {
        evt.preventDefault();
        const data = {
            orderNumber: Date.now(),
            user: (user.email === '' || user.email === undefined ? emailValue : user.email),
            userInfo: {
                firstName: firstNameValue,
                secondName: secondNameValue,
                phone: phoneValue,
                postCode: postCodeValue,
                city: cityValue,
                adress: adressValue
            },
            items: cartValue
        }
        await makeOrder({
            url:'https://e-commerce-35f70-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
    }
    return(
        <>
            {!isLoading && !isDone && <Wrapper title={'Order details - enter your adress'}>
                <Form onSubmit={makeOrderHandler}>
                {(user.email === '' || user.email === undefined) && <div className={emailTouched && emailError && 'error'}>
                        <label>
                            Email:
                        </label>
                        <input 
                            type='text' 
                            value={emailValue}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                            className={emailTouched && emailError && 'error'}
                            />
                    </div>}
                    {emailTouched && emailError && <span>First name can not be empty</span>}
                    <div className={firstNameTouched && firstNameError && 'error'}>
                        <label>
                            First Name:
                        </label>
                        <input 
                            type='text' 
                            value={firstNameValue}
                            onChange={firstNameChangeHandler}
                            onBlur={firstNameBlurHandler}
                            className={firstNameTouched && firstNameError && 'error'}
                            />
                    </div>
                    {firstNameTouched && firstNameError && <span>First name can not be empty</span>}
                    <div className={secondNameTouched && secondNameError && 'error'}>
                        <label>
                            Second Name:
                        </label>
                        <input 
                            type='text' 
                            value={secondNameValue}
                            onChange={secondNameChangeHandler}
                            onBlur={secondNameBlurHandler}
                            className={secondNameTouched && secondNameError && 'error'}
                            />
                    </div>
                    {secondNameTouched && secondNameError && <span>Second name can not be empty</span>}
                    <div className={phoneTouched && phoneError && 'error'}>
                        <label>
                            Phone:
                        </label>
                        <input 
                            type='text' 
                            value={phoneValue}
                            onChange={phoneChangeHandler}
                            onBlur={phoneBlurHandler}
                            placeholder={'444-444-444'}
                            className={phoneTouched && phoneError && 'error'}
                            />
                    </div>
                    <div className={phoneTouched && phoneError && 'error'}>
                        <label>
                            Post Code:
                        </label>
                        <input 
                            type='text' 
                            value={postCodeValue}
                            onChange={postCodeChangeHandler}
                            onBlur={postCodeBlurHandler}
                            placeholder={'44-444'}
                            className={postCodeTouched && postCodeError && 'error'}
                            />
                    </div>
                    {postCodeTouched && postCodeError && <span>Invalid post-code</span>}
                    <div className={cityTouched && cityError && 'error'}>
                        <label>
                            City:
                        </label>
                        <input 
                            type='text' 
                            value={cityValue}
                            onChange={cityChangeHandler}
                            onBlur={cityBlurHandler}
                            className={cityTouched && cityError && 'error'}
                            />
                    </div>
                    {cityTouched && cityError && <span>City can not be empty</span>}
                    <div className={adressTouched && adressError && 'error'}>
                        <label>
                            Adress:
                        </label>
                        <input 
                            type='text' 
                            value={adressValue}
                            onChange={adressChangeHandler}
                            onBlur={adressBlurHandler}
                            className={adressTouched && adressError && 'error'}
                            />
                    </div>
                    {adressTouched && adressError && <span>Adress can not be empty</span>}
                    <Button value='Order' disabled={!isValid}/>
                </Form>
            </Wrapper>}
            {(isLoading || error || isDone) &&  <StyledContainer>
                {isLoading && <Modal animate/>}
                {!isLoading && !error && isDone && <Modal info message={'Thanks for supporting our shop! Your order is being process.'} orderSuccess/>}
                {!isLoading && error && <Modal info message={'Something went wrong. You will be redirected back to cart.'} orderError/>}
            </StyledContainer>}
        </>
    )
}
export default OrderForm;
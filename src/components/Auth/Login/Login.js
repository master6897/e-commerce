import Wrapper from '../../helpers/Wrapper/Wrapper';
import Button from '../../helpers/Button/Button';
import useInput from '../../hooks/use-input';
import Form from '../../helpers/Form/Form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useHttp from '../../hooks/use-http';
import Modal from '../../helpers/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../../store/auth-slice';

const StyledLink = styled(Link)`
    font-size: 1.2rem;
    color: var(--first);
    text-decoration: none;
    transition: .3s;
    &:hover{
        color: black;
    }
`
const Login = () => {
    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.auth.isLogged);
    const {
        value: emailValue,
        isValid: emailValid,
        isTouched: emailTouched,
        error: emailError,
        valueChangeHandler: emailChangeHandler,
        valueBlurHandler: emailBlurHandler,
        reset: emailReset
    } = useInput((item) => item.trim().length > 0);
    const {
        value: passwordValue,
        isValid: passwordValid,
        isTouched: passwordTouched,
        error: passwordError,
        valueChangeHandler: passwordChangeHandler,
        valueBlurHandler: passwordBlurHandler,
        reset: passwordReset
    } = useInput((item) => item.trim().length > 6);

    let formIsValid = false;
    if(emailValid && passwordValid){
        formIsValid = true;
    }

    const handleResponse = (response) => {
        dispatch(authActions.login({
            idToken: response.idToken,
            expiresIn: (+response.expiresIn * 1000),
            email: response.email
        }));
    }
    const {isLoading, error, isDone, sendRequest: authenticateUser} = useHttp(handleResponse);
    const submitLoginHandler = (evt) => {
        evt.preventDefault();
        authenticateUser({
            url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZ9yg6GFjF9rNlHmOdcDMsfolvIb4Udqg',
            method: 'POST',
            body: {
                email: emailValue,
                password: passwordValue,
                returnSecureToken: true
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    return(
        <Wrapper title={'Login'} isLoading={isLoading} error={error} isDone={isDone}>
            {!isLoading && !isDone && (
                <>
                    <Form onSubmit={submitLoginHandler}>
                    <div>
                        <label>Email:</label>
                        <input 
                            type='text'
                            value={emailValue}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                            className={emailTouched && emailError && 'error'}
                        />
                    </div>
                    {emailTouched && emailError && <span>Enter valid email</span>}
                    <div>
                        <label>Password:</label>
                        <input 
                            type='password'
                            value={passwordValue}
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                            className={passwordTouched && passwordError && 'error'}
                        />
                    </div>
                    {passwordTouched && passwordError && <span>Enter valid password</span>}
                    <Button 
                        value='Login'
                        type='submit'
                        disabled={!formIsValid}
                    />
                    </Form>
                    <h4>Don't have an account?</h4>
                    <StyledLink to='/register'>Sign in</StyledLink>
                </>)}
            {isLoading && !error && <Modal animate />}
            {!isLoading && isDone && !error && <Modal info logged message={`Welcome back ${emailValue}`}/>}
            {error && <Modal info fail message={'Login failed!'}/>}
         </Wrapper>
    )   
}
export default Login;
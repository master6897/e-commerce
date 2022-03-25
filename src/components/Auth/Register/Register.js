import Wrapper from '../../helpers/Wrapper/Wrapper';
import Button from '../../helpers/Button/Button';
import useInput from '../../hooks/use-input';
import Form from '../../helpers/Form/Form';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import Modal from '../../helpers/Modal/Modal';

const Register = () => {
    const navigate = useNavigate();
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
    const {isLoading, error, isDone, sendRequest: authenticateUser} = useHttp();
    const submitRegistrationHandler = (evt) => {
        evt.preventDefault();
        authenticateUser({
            url: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZ9yg6GFjF9rNlHmOdcDMsfolvIb4Udqg',
            method: 'POST',
            body: {
                email: emailValue,
                password: passwordValue,
                returnSecureToken: true
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    return(
        <Wrapper title={'Registration'} isLoading={isLoading} error={error} isDone={isDone}>
            {!isLoading && !isDone &&
                (<>
                    <Form onSubmit={submitRegistrationHandler}>
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
                        value='Register'
                        type='submit'
                        disabled={!formIsValid}
                    />
                    </Form>
                    <Button 
                        value='Back to login'
                        type='submit'
                        style={{marginTop: '1rem'}}
                        onClick={() => navigate('/login')}
                        />
                </>)}
            {isLoading && !error && <Modal animate />}
            {!isLoading && isDone && <Modal info registered message={'Succesfully registered!'}/>}
            {error && <Modal info fail message={'Registration failed!'}/>}
         </Wrapper>
    )   
}
export default Register;
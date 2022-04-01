import Button from "../../helpers/Button/Button";
import Wrapper from "../../helpers/Wrapper/Wrapper";
import Form from "../../helpers/Form/Form";
import useInput from "../../hooks/use-input";
import useHttp from '../../hooks/use-http';
import Modal from '../../helpers/Modal/Modal';
import { useDispatch } from "react-redux";
import { authActions } from "../../../store/auth-slice";
import { useNavigate } from "react-router-dom";
import { storage } from "../../../firebase/firebase";
import { useState } from "react";
import userDefaultPhoto from '../../../pictures/user.png'


const ProfileEventsForm = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);
    const [isDonePhoto, setIsDonephoto] = useState(false);
    const [photoError, setPhotoError] = useState(false);
    //password
    const {
        value: passwordValue,
        isValid: passwordValid,
        isTouched: passwordTouched,
        error: passwordError,
        valueChangeHandler: passwordChangeHandler,
        valueBlurHandler: passwordBlurHandler
    } = useInput((item) => item !== '' && item.trim().length > 0);
    const {
        value: passwordRepeatValue,
        isValid: passwordRepeatValid,
        isTouched: passwordRepeatTouched,
        error: passwordRepeatError,
        valueChangeHandler: passwordRepeatChangeHandler,
        valueBlurHandler: passwordRepeatBlurHandler
    } = useInput((item) => item !== '' && item === passwordValue);
    const user = props.user;

    const handleResponse = (response) => {
        console.log(response);
     }

    const {isLoading: isLoadingPass, error: errorPass, isDone: isDonePass, sendRequest: changePassword} = useHttp(handleResponse);
    
    const changeUserPassword = (evt) => {
        props.loadingChangeHandler();
        evt.preventDefault();
        changePassword({
            url:'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAZ9yg6GFjF9rNlHmOdcDMsfolvIb4Udqg',
            method: 'POST',
            body: {
                idToken: user.token,
                password: passwordValue,
                returnSecureToken: false
            },
            headers: {
                'Content-type' : 'application/json'
            },
        });
        if(isDonePass && !errorPass){
            dispatch(authActions.logout());
            navigate('/');
        }
    }

    let passwordChangeIsValid = false;
    if(passwordValid && passwordRepeatValid){
        passwordChangeIsValid = true;
    }

    //photo
    const {
        value: photoChangeValue,
        isValid: photoChangeValid,
        isTouched: photoChangeTouched,
        error: photoChangeError,
        valueChangeHandler: photoChangeChangeHandler,
        valueBlurHandler: photoChangeBlurHandler
    } = useInput((item) => item !== '', true);

    const photoSubmitHandler = (evt) => {
        evt.preventDefault();
        props.loadingChangeHandler();
        setIsLoadingPhoto(true);
        storage.ref(user.email).listAll().then((res) => {
            res.items.forEach((itemRef) => {
                itemRef.delete();
            });
        }).then(() => {
            const storageRef = storage.ref(user.email + '/' + photoChangeValue.name);
            storageRef.put(photoChangeValue).then(() => {
                setIsLoadingPhoto(false);
                setIsDonephoto(true);
                setPhotoError(false);
            }).catch((err) => {
                storage.ref(user.email + '/photo').put(userDefaultPhoto);
                setIsLoadingPhoto(false);
                setPhotoError(err);
            });
        })
    }
    return(
        <>
            {!isLoadingPass && !isDonePass && !isLoadingPhoto && !isDonePhoto && <Wrapper title={props.photo? 'Change profile photo' : 'Change password'} child>
                <Form onSubmit={props.photo ? photoSubmitHandler : changeUserPassword}>
                    {props.photo ? 
                    (<>
                        <div className={photoChangeTouched && photoChangeError && 'error'}>
                            <label>Choose new photo</label>
                            <input 
                                type='file' 
                                onChange={photoChangeChangeHandler}
                                onBlur={photoChangeBlurHandler}
                                className={photoChangeTouched && photoChangeError && 'error'}
                            />
                            {photoChangeTouched && photoChangeError && <span style={{color: 'red'}}>Choose valid photo</span>}
                            {photoChangeValue.size > 100000 && <span style={{color: 'red'}}>Photo is too big! (max 100KB)</span>}
                        </div>
                        <Button type='submit' value='Change photo' disabled={!photoChangeValid}/>
                    </>)
                    :
                    (<> 
                        <div className={passwordTouched && passwordError && 'error'}>
                            <label>New password</label>
                            <input 
                                type='password' 
                                value={passwordValue}
                                onChange={passwordChangeHandler}
                                onBlur={passwordBlurHandler}
                                className={passwordTouched && passwordError && 'error'}
                                />
                        </div>
                        {passwordTouched && passwordError && <span style={{color: 'red'}}>Password can not be empty!</span>}
                        <div className={passwordRepeatTouched && passwordRepeatError && 'error'}>
                            <label>Confirm new password</label>
                            <input 
                                type='password' 
                                value={passwordRepeatValue}
                                onChange={passwordRepeatChangeHandler}
                                onBlur={passwordRepeatBlurHandler}
                                className={passwordRepeatTouched && passwordRepeatError && 'error'}
                                />
                        </div>
                        {passwordRepeatTouched && passwordRepeatError && <span style={{color: 'red'}}>Password confirmation can not be empty!</span>}
                        {passwordRepeatTouched && passwordRepeatValue !== passwordValue && <span style={{color: 'red'}}>Passwords are not equal!</span>}
                        <Button type='submit' value='Change password' disabled={!passwordChangeIsValid}/>
                    </>)}
                </Form>
            </Wrapper>}
            {(isLoadingPass || isLoadingPhoto) && <Modal animate />}
            {!isLoadingPass && isDonePass && !errorPass && <Modal info passChanged message={'Password changed succesfully'} />}
            {((!isLoadingPass && errorPass) || (isLoadingPhoto && photoError)) && <Modal info message={'Something went wrong!'} />}
            {!isLoadingPhoto  && !photoError && isDonePhoto && <Modal info photo message={'Photo changed succesfully'} />}
        </>
    )
}
export default ProfileEventsForm;
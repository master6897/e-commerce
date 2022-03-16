import {useState} from 'react';

const useInput = (validation, photo=false) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validation(enteredValue);
    const error = isTouched && !valueIsValid;
    
    const valueChangeHandler = (evt) => {
        if(!photo){
            setEnteredValue(evt.target.value);
        }else{
            setEnteredValue(evt.target.files[0]);
        }
    }

    const valueBlurHandler = () => {
        setIsTouched(true);
    }

    const reset = () => {
        setEnteredValue('');
        setIsTouched(false);
    }
    return{
        value: enteredValue,
        isValid: valueIsValid,
        isTouched,
        error,
        valueChangeHandler,
        valueBlurHandler,
        reset
    }
}
export default useInput;
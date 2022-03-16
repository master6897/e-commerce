import React, {useState} from 'react';

import styled from "styled-components";
import Button from '../helpers/Button/Button';
import { storage } from '../../firebase/firebase';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    & div{
        width: 90%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        margin-bottom: 2rem;
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
        }
    }
`

const NewProductForm = () => {
    const allInputs = {imgUrl: ''};
    const [imageAsFile, setImageAsFile] = useState('');
    const [imageAsUrl, setImageAsUrl] = useState(allInputs);

    console.log(imageAsFile);
    console.log(imageAsUrl);

    const imageAsFileHandler = (evt) => {
        const image = evt.target.files[0];
        setImageAsFile(image);
    }

    const firebaseUploadHandler = (evt) => {
        evt.preventDefault();
        if(imageAsFile === ''){
            console.log(`not an image, the imgae file is a ${typeof(imageAsFile)}`);
        }
        const uploadImage = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);
        uploadImage.on('state_changed', (snapShot) => {
            console.log(snapShot);
        }, (err) => {
            console.log(err);
        }, () => {
            storage.ref('images').child(imageAsFile.name).getDownloadURL()
            .then(fireBaseUrl => {
                setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
            })
        });
    }

    return(
        <StyledForm onSubmit={firebaseUploadHandler}>
            <div>
                <label>Name of product:</label>
                <input type='text' />
            </div>
            <div>
                <label>Price:</label>
                <input type='number' />
            </div>
            <div>
                <label>Description:</label>
                <textarea cols={20} rows={5}/>
            </div>
            <div>
                <label>Photo of the product:</label>
                <input 
                    type='file' 
                    onChange={imageAsFileHandler}
                />
            </div>
            <Button 
                value='Add new product'
                type='submit'
            />
        </StyledForm>
    )
}
export default NewProductForm;
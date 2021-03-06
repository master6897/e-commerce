import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../../helpers/Card/Card";
import defaultUserPhoto from '../../../pictures/user.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Button from "../../helpers/Button/Button";
import ProfileEventsForm from "./ProfileEventsForm";
import { useEffect, useState } from "react";
import { storage } from "../../../firebase/firebase";
import useHttp from "../../hooks/use-http";
import { ordersActions } from "../../../store/orders-slice";
import Modal from "../../helpers/Modal/Modal";
import Orders from "./Orders";

const StyledContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 5rem;
    padding: 2rem;
    width: 100%;
    min-height: 65vh;
    box-sizing: border-box;
    & div > div.photo{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height: 40vh;
        width: 30%;
        padding: 2rem;
        box-sizing: border-box;
        border-right: 1px solid black;
        & div{
            width: 80%;
            height: 80%;
            border-radius: 100%;
            & :hover{
                    color: var(--first);
                }
            @media (max-width: 480px){
                height: 15rem;
            }
            & svg{
                position: relative;
                right: -5rem;
                top: 0;
                padding: .4rem;
                cursor: pointer;
            }
        }
        @media (max-width: 480px){
            width: 100%;
            justify-content: space-between;
            border-right: none;
            border-bottom: 1px solid black;
        }
    }
    & div > div.details{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height: 40vh;
        width: 70%;
        padding: 2rem;
        box-sizing: border-box;
        & button{
            margin: 2rem 0;
        }
        @media (max-width: 480px){
            width: 100%;
        }
    }
`;
const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);
    const orders = useSelector(state => state.orders);
    const [photoHandler, setPhotoHandler] = useState(false);
    const [passHandler, setPassHandler] = useState(false);
    const [firebasePicture, setFirebasePicture] = useState();
    const [isLoadingModal, setIsLoadingModal] = useState(false);
    const [showOrder, setShowOrder] = useState(false);
    const [isRendered, setIsRendered] = useState(true);

    const changePhotoHandler = () => {
        setPhotoHandler((prevState) => !prevState);
        setPassHandler(false);
    }
    const passwordHandler = () => {
        setPassHandler((prevState) => !prevState);
        setPhotoHandler(false);
    }
    const loadingChangeHandler = () => {
        setIsLoadingModal((prevState) => !prevState);
    }
    const applyData = async (data) => {
        let result = [];
        let tempArray = [];
        for(const key in data){
            tempArray.push({
                id: key,
                ...data[key],
            });
        }
        tempArray.map((element) => {
            if(element.user === user.email){
                result.push(element);
            }
        })
        console.log(result);
        dispatch(ordersActions.getOrders(result));
    }

    const {isLoading, isDone, sendRequest: getOrdersByEmail} = useHttp(applyData);

    const showOrdersHandler = () => {
        setShowOrder((prevState) => !prevState);
    }
    
    useEffect(() => {
        getOrdersByEmail({
            url: `https://e-commerce-35f70-default-rtdb.europe-west1.firebasedatabase.app/orders.json`
        });
        let array = [];
        storage.ref(user.email).listAll().then((res) => {
            res.items.forEach((itemRef) => {
                array.push(itemRef);
                console.log(array);
            });
            if(array.length === 0){
                setFirebasePicture(defaultUserPhoto);
            }
            }).then(() => {
            storage.refFromURL(array[0]).getDownloadURL().then((fireBaseUrl) => {
                    setFirebasePicture(fireBaseUrl);
                })
            }).catch((err) => {
                console.log(err);
        });
        setTimeout(() => {
            setIsRendered(false);
        },500);
    },[firebasePicture, user.email])
    
    
    

    return(
        <StyledContainer>
            {!isLoadingModal && !isRendered &&<Card>
                <div className='photo'>
                    <div style={{background: `url(${firebasePicture}) center / cover no-repeat`}}>
                        <FontAwesomeIcon icon={faPen} onClick={changePhotoHandler}/>
                    </div>
                    <h1>{user.email}</h1>
                </div>
                <div className='details'>
                    <h1>Informations and additional actions</h1>
                    <Button value='Change password' onClick={passwordHandler}/>
                    <Button value='Show orders' onClick={showOrdersHandler}/>
                </div>
            </Card>}
            {photoHandler && <ProfileEventsForm photo user={user} loadingChangeHandler={loadingChangeHandler}/>}
            {passHandler && <ProfileEventsForm pass user={user} loadingChangeHandler={loadingChangeHandler}/>}
            {(isLoading || isRendered) && <Modal animate />}
            {isDone && showOrder && <Orders data={orders} />}
        </StyledContainer>
    )
}
export default Profile;
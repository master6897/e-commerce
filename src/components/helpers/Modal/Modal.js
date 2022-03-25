import styled, {css, keyframes} from "styled-components";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const animation = keyframes`
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
`;

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    ${props => props.animate && css`
        & div.animation{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 20rem;
            &:after{
                content: " ";
                display: block;
                width: 64px;
                height: 64px;
                margin: 8px;
                border-radius: 50%;
                border: 6px solid #fff;
                border-color: var(--first) transparent var(--first) transparent;
                animation: ${animation} 1.2s linear infinite;
            }
        }
    `}
    ${props => props.info && css`
        & div.info{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 90%;
            height: 20rem;
            border: 1px solid black;
            border-radius: 20px;
            overflow: hidden;
            & h1{
                display: flex;
                height: 30%;
                width:100%;
                align-items: center;
                justify-content: center;
                background: var(--first);
                margin: 0;
            }
            & h3{
                display: flex;
                height: 50%;
                width:100%;
                align-items: center;
                justify-content: center;
                margin: 0;
            }
            & div.button-container{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 20%;
                width:100%;
            }
        }
    `}
`

const Modal = (props) => {
    const navigate = useNavigate();
    return(
        <StyledContainer animate={props.animate} info={props.info} fail={props.fail} registered={props.registered}>
            {props.animate && (
                <div className='animation'>

                </div>
            )}
            {props.info && (
                <div className='info'>
                    <h1>Info</h1>
                    <h3>{props.message}</h3>
                    <div className='button-container'>
                        {((!props.registered && !props.fail) || props.logged) && <Button value='Okay' onClick={() => navigate('/products')}/>}
                        {props.fail && <Button value='Okay' onClick={() => navigate(0)}/>}
                        {props.registered && <Button value='Okay' onClick={() => navigate('/login')} />}
                    </div>
                </div>
            )}
        </StyledContainer>
    )
}
export default Modal;
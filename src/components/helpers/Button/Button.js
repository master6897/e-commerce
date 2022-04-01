import styled, {css} from "styled-components";

const StyledButton = styled.button`
    padding: 1rem;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    background: black;
    transition: 0.3s;
    font-size: 1.2rem;
    border: 1px solid black;
    &:hover{
        background-color: var(--first);
        color: black;
        border: 1px solid var(--first);
    }
    ${props => props.disabled === true && css`
        background-color: grey;
        color: black;
        cursor: not-allowed;
        border: 1px solid black;
        &:hover{
            background-color: grey;
            color: black;
            cursor: not-allowed;
            border: 1px solid black;
        }
    `}
`

const Button = (props) => {
    return(
        <StyledButton 
            onClick={props.onClick} 
            type={props.type} 
            disabled={props.disabled} 
            style={props.style} 
            className={props.className}
            >
            {props.value}
        </StyledButton>
    )
}
export default Button;
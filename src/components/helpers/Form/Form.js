import styled from "styled-components";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    & div{
        width: 90%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 2rem;
        &.error{
            margin-bottom: 1rem;
        }
        & label{
            width: 50%;
            font-size: 1.2rem;
            font-weight: 600;
            @media (max-width: 480px){
                width: 90%;
            }
        }
        & input{
            width: 50%;
            padding: .5rem;
            border: 1px solid var(--first);
            border-radius: 5px;
            outline: none;
            @media (max-width: 480px){
                width: 90%;
            }
            &.error{
                background-color: var(--third);
            }
        }
        & textarea{
            width: 50%;
            padding: .5rem;
            border: 1px solid var(--first);
            border-radius: 5px;
            outline: none;
            @media (max-width: 480px){
                width: 90%;
            }
            &.error{
                background-color: var(--third);
            }
        }
        &:nth-child(1){
            margin-top: 2rem;
        }
        @media (max-width: 480px){
            flex-direction: column;
        }
    }
    & span{
        color: red;
        margin: 0 0 .8 8rem;
        @media (max-width: 480px){
            margin-bottom: 1rem;
        }
    }
`
const Form = (props) => {
    return(
        <StyledForm onSubmit={props.onSubmit}>
            {props.children}
        </StyledForm>
    )
}
export default Form;
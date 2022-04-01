import styled from "styled-components";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 70%;
    align-items: stretch;
    border: 1px solid black;
    border-radius: 10px;
    overflow: hidden;
    margin: 2rem;
    transition: 0.3s;
    @media (max-width: 480px){
        flex-direction: column;
        -webkit-box-shadow: 0px 3px 24px 0px rgba(66, 68, 90, 1);
        -moz-box-shadow: 0px 3px 24px 0px rgba(66, 68, 90, 1);
        box-shadow: 0px 3px 24px 0px rgba(66, 68, 90, 1);
        width: 90%;
    }
    &:hover{
        -webkit-box-shadow: 0px 3px 24px 0px rgba(66, 68, 90, 1);
        -moz-box-shadow: 0px 3px 24px 0px rgba(66, 68, 90, 1);
        box-shadow: 0px 3px 24px 0px rgba(66, 68, 90, 1);
    }
`;
const Card = (props) => {
    return(
        <StyledContainer>
            {props.children}
        </StyledContainer>
    )
}
export default Card;
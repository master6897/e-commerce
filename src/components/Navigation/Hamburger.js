import styled, {css} from "styled-components";

const StyledContainer = styled.div`
    display: flex;
    position: absolute;
    top: 1rem;
    left: 1rem;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    height: 50%;
    width: 2rem;
    z-index: 99;
    & div{
        width: 100%;
        border: 2px solid var(--first);
        border-radius: 10px;
        transition: .4s ease;
        ${props => props.clicked && css`
            &:nth-child(1){
                transform: translateY(.62rem) rotate(45deg);
            }
            &:nth-child(2){
                display: none;
            }
            &:nth-child(3){
                transform: translateY(-.62rem) rotate(-45deg);
            }
        `}
    }
    @media (min-width: 769px){
        display: none;
    }
`

const Hamburger = (props) => {
    return(
        <StyledContainer onClick={props.burgerShowHandler} clicked={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </StyledContainer>
    )
}
export default Hamburger;
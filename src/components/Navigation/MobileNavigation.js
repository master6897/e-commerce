import styled, {css} from "styled-components";
import Links from "./Links";

const StyledContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.2);
    transition: .4s ease;
    transform: translateX(-100vw);
    ${props => props.clicked && css`transform: translateX(0vw);`}
`;

const StyledLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background: var(--second);
    width: 70%;
    height: 100%;
`

const MobileNavigation = (props) => {
    return(
        <StyledContainer clicked={props.clicked}>
            <StyledLinksContainer>
                <Links mobile burgerShowHandler={props.burgerShowHandler}></Links>
            </StyledLinksContainer>
        </StyledContainer>
    )
}
export default MobileNavigation;
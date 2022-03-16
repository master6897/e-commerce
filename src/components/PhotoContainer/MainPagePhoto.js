
import styled, {keyframes} from "styled-components";
import weightsPhoto from '../../pictures/mainPagePhoto.jpg';

const StyledSection = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-image: url(${weightsPhoto});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    box-sizing: border-box;
`;

const Glassmorphism = styled.div`
    position: absolute;
    left: 2rem;
    padding: 2rem;
    margin-top: 10rem;
    color: white;
    box-sizing: border-box;
    @media (max-width: 768px){
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    & h1{
        font-size: 4rem;
    }
`;

const arrowAnimation = keyframes`
    0%{
        opacity: 0;
        transform: rotate(45deg) translate(-20px,-20px);
    }
    50%{
        opacity: 1;
    }
    100%{
        opacity: 0;
        transform: rotate(45deg) translate(20px,20px);
    }
`;

const StyledContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 2rem;
    height: 5rem;
    top: 80vh;
    background-color: transparent;
    & > span{
        display: block;
        width: 1rem;
        height: 1rem;
        border-bottom: 5px solid var(--first);
        border-right: 5px solid var(--first);
        margin: -10px;
        transform: rotate(45deg);
        animation: ${arrowAnimation} 2s infinite;
        &:nth-child(2){
            animation-delay: -0.2s;
        }
        &:nth-child(3){
            animation-delay: -0.4s;
        }
    }
`

const MainPagePhoto = () => {
    return(
        <StyledSection>
            <Glassmorphism>
                <h1>Best GYM equipment!</h1>
            </Glassmorphism>
            <StyledContainer>
                <span></span>
                <span></span>
                <span></span>
            </StyledContainer>
        </StyledSection>
    )
}
export default MainPagePhoto;
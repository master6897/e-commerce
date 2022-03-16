
import styled, { keyframes } from "styled-components";
import MainPagePhoto from "../../PhotoContainer/MainPagePhoto";
import Details from "./Details";

const animation = keyframes`
    0%{
        --num: 0;
    }
    100%{
        --num:25000;
    }
`
const StyledSection = styled.section`
    padding: 2rem;
    box-sizing: border-box;
    width: 100%;
    background: white;
    & div.satisfied-customers{
        display: block;
        padding: .5rem;
        color: var(--first);
        background-color: black;
        border-radius: 20px;
        font-size: 2rem;
        transition: --num 2s;
        counter-reset: num var(--num);
        animation: ${animation} 3s ease;
        & h1::after{
            content: counter(num);
         }
    }
`;
const WelcomePage = () => {
    return(
        <>
            <MainPagePhoto />
            <StyledSection>
                <Details />
                <div className='satisfied-customers'>
                    <h1> </h1>
                    <h2>Satisfied Customers!</h2>
                </div>
            </StyledSection>
        </>
    )
}
export default WelcomePage;
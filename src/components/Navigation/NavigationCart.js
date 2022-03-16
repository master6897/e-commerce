import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartArrowDown} from '@fortawesome/free-solid-svg-icons';


const StyledIcon = styled(FontAwesomeIcon)`
    font-size: 1.5rem;
    transition: .3s;
`;
const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 3rem;
    background: var(--first);
    padding: .5rem;
    color: black;
    cursor: pointer;
    transition: .3s;
    &:hover{
        & span {
            transform: scale(1.1);
        }
        & ${StyledIcon} {
            transform: scale(1.1);
        }
    }
    & span{
        transition: .3s;
        position: relative;
        font-weight: 600;
        font-size: 1.2rem;
        top: -1rem;
    }
    @media (max-width: 768px){
    }
`;


const NavigationCart = () => {
    return(
        <StyledContainer>
            <StyledIcon icon={faCartArrowDown}/>
            <span>0</span>
        </StyledContainer>
    )
}
export default NavigationCart;
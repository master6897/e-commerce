import React, {useState} from 'react';

import styled from 'styled-components';
import Links from './Links';
import Hamburger from './Hamburger';
import MobileNavigation from './MobileNavigation';
import NavigationCart from './NavigationCart';

const StyledNav = styled.nav`
    display: flex;
    width: 100%;
    height: 5rem;
    background: black;
    position: fixed;
    justify-content: space-between;
    top: 0;
    left: 0;
    z-index: 99;
    @media (max-width: 768px){
        justify-content: flex-end;
    }
`;

const StyledLogo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    color: var(--first);
    @media (max-width: 768px){
        width: 70%;
    }
`;
const Navigation = () => {
    const [burgerClicked, setBurgerClicked] = useState(false);

    const burgerShowHandler = () => {
        setBurgerClicked(!burgerClicked);
    }
    return(
        <StyledNav>
             <StyledLogo>
                 <h1>REACT E-commerce</h1>
             </StyledLogo>
             <Links desktop={true}/>
             <NavigationCart />
             <Hamburger burgerShowHandler={burgerShowHandler} clicked={burgerClicked}/>
             <MobileNavigation burgerShowHandler={burgerShowHandler} clicked={burgerClicked}/>
        </StyledNav>
    )
}
export default Navigation;
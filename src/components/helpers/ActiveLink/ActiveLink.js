import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: var(--first);
    transition: 0.3s;
    font-weight: 600;
    padding: .5rem;
    &:hover{
        cursor: pointer;
        color: white;
        transform: scale(1.1);
    }
    &.active{
        color: white;
        border-bottom: 1px solid white;
    }
`
const ActiveLink = (props) => {
    return(
        <StyledNavLink to={props.path} className={({isActive}) => (
            isActive ? 'active' : null
        )}>
            {props.children}
        </StyledNavLink>
    )
}
export default ActiveLink;
import { css } from "styled-components";
import styled from "styled-components";
import ActiveLink from "../helpers/ActiveLink/ActiveLink";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 60%;
    color: var(--first);
    ${props => props.mobile && css`
        flex-direction: column;
        justify-content: center;
        font-size: 1.2rem;
        width: 100%;
        & > p {
            width: 50%;
            border-bottom: 1px solid var(--first);
        }
    `}
    & p{
        display: block;
        padding: 1rem;
        font-weight: 600;
    }
    ${props => props.desktop && css`
        @media (max-width: 768px){
            display: none;
        }
    `}
`;
const Links = (props) => {
    return(
        <Wrapper mobile={props.mobile} desktop={props.desktop} onClick={() => props.mobile && props.burgerShowHandler()}>
            <ActiveLink path={'/'}>
                Main Page
            </ActiveLink>
            <ActiveLink path={'/products'}>
                Products
            </ActiveLink>
            <ActiveLink path={'/login'}>
                Login
            </ActiveLink>
        </Wrapper>
    )
}
export default Links;
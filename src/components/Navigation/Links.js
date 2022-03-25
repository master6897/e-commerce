import { css } from "styled-components";
import styled from "styled-components";
import ActiveLink from "../helpers/ActiveLink/ActiveLink";
import { useSelector } from "react-redux";
import Button from "../helpers/Button/Button";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { useNavigate } from "react-router-dom";

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
        & button {
            margin-top: 1rem;
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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const logoutHandler = () => {
        dispatch(authActions.logout());
        navigate('/login');
    }
    return(
        <Wrapper mobile={props.mobile} desktop={props.desktop} onClick={() => props.mobile && props.burgerShowHandler()}>
            <ActiveLink path={'/'}>
                Main Page
            </ActiveLink>
            <ActiveLink path={'/products'}>
                Products
            </ActiveLink>
            {isLoggedIn && 
            <ActiveLink path={'/new-product'}>
                Add Product
            </ActiveLink>
            }

            {isLoggedIn &&
            <ActiveLink path={'/profile'}>
                Profile
            </ActiveLink>}
            {isLoggedIn ? 
            <Button value={'Logout'} onClick={logoutHandler}/>
            :
            <ActiveLink path={'/login'}>
                Login
            </ActiveLink>
            }
        </Wrapper>
    )
}
export default Links;
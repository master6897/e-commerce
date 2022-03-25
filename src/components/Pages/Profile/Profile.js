import { useSelector } from "react-redux";
import styled from "styled-components";

const StyledContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5rem;
    padding: 2rem;
    width: 100%;
    min-height: 65vh;
    box-sizing: border-box;
`
const Profile = () => {
    const email = useSelector(state => state.auth.email);
    return(
        <StyledContainer>
            <h1>Hello {email}</h1>
        </StyledContainer>
    )
}
export default Profile;
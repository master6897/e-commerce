import { useNavigate } from "react-router-dom"
import styled from "styled-components";
import Button from "../../helpers/Button/Button";

const StyledContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 5rem;
    padding: 2rem;
    min-height: 60vh;
`;

const NotFound = () => {
    const navigate = useNavigate();
    const backToMainPageHandler = () => {
        navigate('/');
    }
    return(
        <StyledContainer>
            <h1>Page not found!</h1>
            <Button value='Back to main Page' onClick={backToMainPageHandler}/>
        </StyledContainer>
    )
}

export default NotFound;
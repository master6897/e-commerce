import styled from "styled-components";
const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    ${props => props.child ? '' : 'margin-top: 5rem'};
    padding: 2rem;
    box-sizing: border-box;
    width: 100%;
    ${props => props.child ? '' : 'min-height: 65vh'};
`;
const StyledFieldset = styled.fieldset`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 70%;
    box-sizing: border-box;
    & legend{
        font-size: 2rem;
        font-weight: 600;
        text-align: left;
    }
    @media (max-width: 480px){
        width: 90%;
        flex-direction: column;
    }
`;

const Wrapper = (props) => {
    return(
        <StyledContainer child={props.child}>
            {(!props.isLoading && !props.isDone) && <StyledFieldset>
                <legend>{props.title}</legend>
                {props.children}
            </StyledFieldset>}
            {(props.isLoading || props.error || props.isDone) && <>{props.children}</>  }
        </StyledContainer>
    )
}
export default Wrapper;
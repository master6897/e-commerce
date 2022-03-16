import styled from "styled-components";
import NewProductForm from "./NewProductForm";

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1rem;
    margin-top: 5rem;
    box-sizing: border-box;
    min-height: 50vh;
`
const NewProduct = () => {
    return(
        <StyledContainer>
            <h1>Add product</h1>
            <NewProductForm />
        </StyledContainer>
    )
}
export default NewProduct;
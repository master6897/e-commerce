import styled from 'styled-components';

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5rem;
    width: 100%;
    @media (max-width: 480px){
        overflow: scroll;
        align-items: flex-start;
        justify-content: flex-start;
    }
`;
const StyledTable = styled.table`
    width: 70%;
    flex-wrap: wrap;
    flex-direction: column;
    font-family: arial, sans-serif;
    border-collapse: collapse;
    border-radius: 10px;
    & td, th {
        border: 1px solid black;
        text-align: left;
        padding: 8px;
    }
    & tr:nth-child(even) {
        background-color: #dddddd;
    }
    & tr:nth-child(1){
        font-size: 1.2rem;
        font-weight: 600;
    }
`
const Orders = (props) => {
    console.log(props.data);
    return(
        <StyledContainer>
            {props.data.orders.length !== 0 && <StyledTable>
                    <tr>
                        <td>Date</td>
                        <td>Product(s)</td>
                        <td>Adress</td>
                        <td>Contact</td>
                        <td>Total cost</td>
                    </tr>
                    {props.data.orders.map((element) => (
                        <tr key={element.id}>
                            <td>{new Date(element.orderNumber).toLocaleDateString('pl-PL')}</td>
                            <td>
                                {element.items.products.map((product, index) => (
                                    <p key={index}>{index+1}. {product.name} x{product.amount}</p>
                                ))}
                            </td>
                            <td>
                                <p>
                                    {element.userInfo.city} {element.userInfo.postCode}, {element.userInfo.adress}
                                </p>
                            </td>
                            <td>
                                {element.userInfo.phone}
                            </td>
                            <td>{element.items.totalCost}$</td>
                        </tr>
                    ))}
            </StyledTable>}
            {props.data.orders.length === 0 && <h1>No orders yet!</h1>}
        </StyledContainer>
    )
}
export default Orders;
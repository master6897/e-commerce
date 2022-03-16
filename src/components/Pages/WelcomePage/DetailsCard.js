
import styled from "styled-components";
import teamMembers from '../../../pictures/teamMembers.jpg';
import warehouseMan from '../../../pictures/warehouseMan.jpg';
import achievements from '../../../pictures/achievments.jpg';

const StyledContainer = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: center;
    width: 90%;
    border: 1px solid transparent;
    box-sizing: border-box;
    border-radius: 20px;
    -webkit-box-shadow: 0px 3px 24px 0px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 3px 24px 0px rgba(66, 68, 90, 1);
    box-shadow: 0px 3px 24px 0px rgba(66, 68, 90, 1);
    overflow: hidden;
    margin-bottom: 4rem;
    & div.photo{
        display: flex;
        width: 30%;
        ${props => props.photo === 'about' && `background-image: url(${teamMembers})`};
        ${props => props.photo === 'quality' && `background-image: url(${warehouseMan})`};
        ${props => props.photo === 'achievements' && `background-image: url(${achievements})`};
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

    }
    & div.description{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        text-align: justify;
        width: 70%;
        padding: 1rem;
    }
`;

const DetailsCard = (props) => {
    return(
        <StyledContainer photo={props.photo}>
            {props.reverse ? (
            <>
                <div className='description'>
                    <h1>{props.title}</h1>
                    <p>{props.description}</p>
                </div>
                <div className='photo'>
                </div>
            </>
            ) : (
            <>
                <div className='photo'>
                </div>
                <div className='description'>
                    <h1>{props.title}</h1>
                    <p>{props.description}</p>
                </div>
            </>
            )}
        </StyledContainer>
    )
}
export default DetailsCard;
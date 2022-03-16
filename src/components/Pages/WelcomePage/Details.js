import styled from "styled-components";
import DetailsCard from "./DetailsCard";

const StyledSection = styled.section`
    display: flex;
    min-height: 30vh;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

const Details = () => {
    return(
        <StyledSection>
            <DetailsCard 
                title={'About Us'}
                photo='about'
                description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur odio ut sem ultrices, in dictum mauris fermentum. Etiam feugiat velit et odio tristique egestas. Quisque ornare semper ipsum, in egestas mauris pretium ac. Pellentesque sollicitudin, est ut dignissim rutrum, purus lectus semper ipsum, eu mattis massa erat ac sem. Sed sagittis nisl ut neque tempus consequat. Vivamus efficitur eu diam eget iaculis. Sed non vulputate risus, in aliquet lorem.'}
            />
            <DetailsCard 
                reverse
                title={'Best quality!'}
                photo='quality'
                description={'Vestibulum neque dui, malesuada eget ultrices sed, euismod a ipsum. Curabitur et tellus arcu. Quisque cursus lectus massa, eget porttitor felis consectetur ut. Aliquam non massa a arcu semper sodales. Nunc in eros quam. In placerat orci vel massa dictum lobortis. Sed id ultrices tellus. Ut diam turpis, sollicitudin vel laoreet vel, fermentum a quam. In vulputate, ligula ut aliquet rutrum, odio velit gravida lectus, sed blandit est justo et orci. In at bibendum leo. Pellentesque a leo vel ipsum volutpat viverra eu eu sem.'}
            />
            <DetailsCard 
                title={'Our achievmentes'}
                photo='achievements'
                description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur odio ut sem ultrices, in dictum mauris fermentum. Etiam feugiat velit et odio tristique egestas. Quisque ornare semper ipsum, in egestas mauris pretium ac. Pellentesque sollicitudin, est ut dignissim rutrum, purus lectus semper ipsum, eu mattis massa erat ac sem. Sed sagittis nisl ut neque tempus consequat. Vivamus efficitur eu diam eget iaculis. Sed non vulputate risus, in aliquet lorem.'}
            />
        </StyledSection>
    )
}
export default Details;
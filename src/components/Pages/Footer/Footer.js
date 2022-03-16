import styled from "styled-components";

const StyledFooter = styled.footer`
    width:100%;
    display: flex;
    align-items: stretch;
    justify-content: space-around;
    flex-direction: column;
    padding: 1rem;
    background: black;
    min-height: 20vh;
    color: white;
    box-sizing: border-box;
    & div.wrapper{
        display: flex;
        align-items: stretch;
        justify-content: space-around;
        padding-bottom: 2rem;
        border-bottom: 2px solid white;
    
        & div.container{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            & p{
                transition: 0.3s;
                &:hover{
                    color: var(--first);
                    cursor: pointer;
                }
            }
        }
        @media (max-width: 480px){
            flex-direction: column;
        }
    }

    & div > h3.author{
        font-style: italic;
    }
`
const Footer = () => {
    return(
        <StyledFooter>
            <div className='wrapper'>
                <div className='container'>
                    <h1>Clients</h1>
                    <p>Contact</p>
                    <p>FAQ</p>
                    <p>Shipping and delivery</p>
                    <p>Returns</p>
                </div>
                <div className='container'>
                    <h1>Social Media</h1>
                    <p>Facebook</p>
                    <p>Instagram</p>
                    <p>Twitter</p>
                    <p>TikTok</p>
                </div>
                <div className='container'>
                    <h1>Newsletter</h1>
                    <input type='text' />
                    <button>Sign Up</button>
                </div>
            </div>
            <div>
                <h3 className='author'>Created by Marcin Puc</h3>
            </div>
        </StyledFooter>
    )
}
export default Footer;
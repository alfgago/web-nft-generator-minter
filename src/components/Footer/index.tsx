import { FooterStyles } from "./FooterStyles"
import { FooterNav } from "./FooterStyles"

const Footer = () => {
  return (
    <FooterStyles>
      <section className="footer">
        <div className="content">
          <img
            src="/assets/img/plusone-logo-horizontal.png"
            alt="plusOne-vertical"
            className="waterMarkLogo"
          />
          <FooterNav>
            <ul>
              <li>Explore Artists</li>
              <li>Explore NFTs</li>
              <li>Login</li>
            </ul>
          </FooterNav>
        </div>
      </section>
    </FooterStyles>
  )
}
export default Footer

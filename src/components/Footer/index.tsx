import { FooterStyles } from "./FooterStyles"
import { FooterBg, FooterNav } from "./FooterStyles"

const Footer = () => {
  return (
    <FooterStyles>
      <div className="footer">
        <FooterBg>
          <img
            src="./resources/img/plusone-logo-horizontal.png"
            alt="plusOne-vertical"
            className="waterMarkLogo"
          />
          <FooterNav>
            <ul>
              <li>Artist</li>
              <li>About</li>
              <li>Login</li>
              <li>
                <div
                  style={{
                    width: 70,
                    height: 70,
                    background: "#D9D9D9",
                    borderRadius: "50%",
                  }}
                ></div>
              </li>
            </ul>
          </FooterNav>
        </FooterBg>
      </div>
    </FooterStyles>
  )
}
export default Footer

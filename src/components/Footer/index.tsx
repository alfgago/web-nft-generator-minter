import Link from "next/link"

import { FooterStyles } from "./FooterStyles"
import { FooterNav } from "./FooterStyles"

const Footer = () => {
  return (
    <FooterStyles>
      <section className="footer">
        <div className="content">
          <Link href="/">
            <img
              src="/assets/img/long-logo.svg"
              alt="plusOne-vertical"
              className="watermark-logo"
            />
          </Link>
          <FooterNav>
            <ul>
              <li>
                <Link href="/resources/artists">Explore Artists</Link>
              </li>
              <li>
                <Link href="/resources/passes">Explore Passes</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
            </ul>
            <span className="preload-font tickerbit">Tickerbit</span>
          </FooterNav>
        </div>
      </section>
    </FooterStyles>
  )
}
export default Footer

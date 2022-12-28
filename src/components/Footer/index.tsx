import Link from "next/link"

import { FooterStyles } from "./FooterStyles"
import { FooterNav } from "./FooterStyles"

const Footer = () => {
  return (
    <FooterStyles>
      <section className="footer">
        <div className="content">
          <Link as="a" href="/">
            <img
              src="/assets/img/long-logo.svg"
              alt="plusOne-vertical"
              className="watermark-logo"
            />
          </Link>
          <FooterNav>
            <ul>
              <li>
                <Link as="a" href="/artists">
                  Explore Artists
                </Link>
              </li>
              <li>
                <Link as="a" href="/passes">
                  Explore Passes
                </Link>
              </li>
              <li>
                <Link as="a" href="/about">
                  About Us
                </Link>
              </li>
            </ul>
          </FooterNav>
        </div>
      </section>
    </FooterStyles>
  )
}
export default Footer

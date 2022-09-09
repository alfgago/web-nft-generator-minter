import Link from "next/link"
import { HeaderStyles } from "./HeaderStyles"

const Header = () => {

  return (
      <HeaderStyles>
        <div className="footer">
          <Link href="/"><a >Inicio</a></Link>
          <Link href="/about"><a>About</a></Link>
        </div>
      </HeaderStyles>
  )
}
export default Header

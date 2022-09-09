import Button from "../Common/Button"
import { AboutStyles } from "./AboutStyles"

const About = () => {

  const buttonAction = () => {
    alert('Cliqueado')
  }

  return (
      <AboutStyles>
        <main>
            <h1>
              Página de about
            </h1>
            <Button label="Ejemplo" action={buttonAction}/>
        </main>
      </AboutStyles>
  )
}

export default About

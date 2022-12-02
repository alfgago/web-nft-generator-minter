import GradientBackground from "../GradientBackground"

import { SimpleHeaderStyles } from "./SimpleHeaderStyles"

const SimpleHeader = ({
  title,
  textAlign = "center",
  backgroundColor = "#000",
  textColor = "#fff",
  gradient = true,
}: any) => {
  return (
    <SimpleHeaderStyles
      textAlign={textAlign}
      backgroundColor={backgroundColor}
      textColor={textColor}
      className="simple-header"
    >
      <GradientBackground />
      <div className="content">
        <h1>{title}</h1>
      </div>
    </SimpleHeaderStyles>
  )
}

export default SimpleHeader

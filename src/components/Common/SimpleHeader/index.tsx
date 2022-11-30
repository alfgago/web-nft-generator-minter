import GradientBackground from "../GradientBackground"

import { SimpleHeaderStyles } from "./SimpleHeaderStyles"

const SimpleHeader = ({
  title,
  textAlign = "center",
  backgroundColor = "#000",
  textColor = "#fff",
  gradient = true,
  children,
}: any) => {
  return (
    <SimpleHeaderStyles
      textAlign={textAlign}
      backgroundColor={backgroundColor}
      textColor={textColor}
    >
      <GradientBackground />
      <div className="content">
        <h1>{title}</h1>
        {children}
      </div>
    </SimpleHeaderStyles>
  )
}

export default SimpleHeader

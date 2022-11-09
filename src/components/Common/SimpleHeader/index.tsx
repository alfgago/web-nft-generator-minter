import { SimpleHeaderStyles } from "./SimpleHeaderStyles"

const SimpleHeader = ({
  title,
  textAlign = "center",
  backgroundColor = "#000",
  textColor = "#fff",
}: any) => {
  return (
    <SimpleHeaderStyles
      textAlign={textAlign}
      backgroundColor={backgroundColor}
      textColor={textColor}
    >
      <div className="content">
        <h1>{title}</h1>
      </div>
    </SimpleHeaderStyles>
  )
}

export default SimpleHeader

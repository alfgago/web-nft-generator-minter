import { SimpleHeaderStyles } from "./SimpleHeaderStyles"

const SimpleHeader = ({ title }: any) => {
  return (
    <SimpleHeaderStyles>
      <div className="content">
        <h1>{title}</h1>
      </div>
    </SimpleHeaderStyles>
  )
}

export default SimpleHeader

import { CommonStyles } from "./CommonStyles"

const Button = ({ action, label }: any) => {
  return <CommonStyles onClick={() => action()}>{label}</CommonStyles>
}

export default Button

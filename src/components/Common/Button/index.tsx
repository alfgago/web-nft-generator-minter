import { CommonButton } from "../CommonStyles"

const Button = ({ action, label }: any) => {
  return <CommonButton onClick={() => action()}>{label}</CommonButton>
}

export default Button

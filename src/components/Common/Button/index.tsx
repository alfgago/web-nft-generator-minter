import { CommonPill } from "../CommonStyles"

const Button = ({ action, label }: any) => {
  return (
    <CommonPill className="clickable" onClick={() => action()}>
      {label}
    </CommonPill>
  )
}

export default Button

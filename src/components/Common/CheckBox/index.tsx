import { useState } from "react"

import { Checkbox } from "../CommonStyles"

const CheckBox = ({ id = "", name = "", label = "", defaultState }: any) => {
  const [check, setIsChecked] = useState(defaultState)

  const handleChange = () => {
    setIsChecked(!check)
  }

  return (
    <Checkbox>
      <input
        type="checkbox"
        defaultChecked={defaultState}
        onChange={handleChange}
        id={id}
        name={name}
      />
      {label && label}
    </Checkbox>
  )
}

export default CheckBox

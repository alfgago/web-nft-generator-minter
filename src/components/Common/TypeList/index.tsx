import { CommonPill } from "@/components/Common/CommonStyles"

import { TypeListStyles } from "./TypeListStyles"

const TypeList = ({ types, selected, onSelect }: any) => {
  return (
    <TypeListStyles>
      <ul>
        {types &&
          types.length >= 1 &&
          types.map((item: any, index: number) => (
            <li
              key={"type-item" + index}
              className={`type-item ${index == selected ? "active" : ""}`}
              onClick={() => onSelect(index)}
            >
              <CommonPill className="clickable small">{item.name}</CommonPill>
            </li>
          ))}
      </ul>
    </TypeListStyles>
  )
}

export default TypeList

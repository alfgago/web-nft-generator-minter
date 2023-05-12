import { use, useState } from "react"
import Collapsible from "react-collapsible"
import slugify from "react-slugify"
import { ReactSVG } from "react-svg"

import { FAQStyles } from "./FAQStyles"

const FAQ = ({ faqs, type }: any) => {
  const [filterFaqs, setFilterFaqs] = useState(faqs)

  const handleChange = (e: any) => {
    e.preventDefault()
    const pressedText = e.target.value.toLowerCase()

    if (pressedText.length > 0) {
      setFilterFaqs(
        faqs.filter((faq: any) => {
          return faq.question.toLowerCase().match(pressedText)
        })
      )
    } else {
      setFilterFaqs(faqs)
    }
  }
  return (
    <FAQStyles>
      <div className="content">
        <h2>FAQ</h2>
        <div className="search-wrapper">
          <input
            type="search"
            onChange={()=>handleChange}
            className="search-bar"
            placeholder={
              type === "1" ? "Search the Artist FAQs..." : "Search the Fan FAQs..."
            }
          />
          <ReactSVG className="icon" src="/assets/icons/search.svg" />
        </div>
        {filterFaqs.map((item: any, index: number) => (
          <div
            className="question"
            key={"faq-" + index}
            id={slugify(item.question)}
          >
            <Collapsible
              key={"faq-" + index}
              accordionPosition={index}
              openedClassName="active"
              trigger={item.question}
              easing="cubic-bezier(.67,.86,.68,1.19)"
              transitionTime={400}
            >
              <div
                className="answer"
                dangerouslySetInnerHTML={{
                  __html: item.answer,
                }}
              />
            </Collapsible>
          </div>
        ))}
      </div>
    </FAQStyles>
  )
}

export default FAQ

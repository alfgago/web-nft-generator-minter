import Collapsible from "react-collapsible"
import slugify from "react-slugify"

import { FAQStyles } from "./FAQStyles"

const FAQ = ({ faqs }: any) => {
  return (
    <FAQStyles>
      <div className="content">
        <h2>FAQ</h2>
        {faqs.map((item: any, index: number) => (
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

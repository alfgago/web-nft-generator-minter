import Collapsible from "react-collapsible"

import { FAQStyles } from "./FAQStyles"

const FAQ = ({ faqs }: any) => {
  return (
    <FAQStyles>
      <div className="content">
        <h2>FAQ</h2>
        {faqs.map((item: any, index: number) => (
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
        ))}
      </div>
    </FAQStyles>
  )
}

export default FAQ

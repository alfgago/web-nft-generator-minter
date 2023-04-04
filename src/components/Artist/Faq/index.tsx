import { FaqStyles } from "./FaqStyles"

const Faq = ({ title, items }: any) => {
  return (
    <FaqStyles>
      <div className="content">
        <h2 className="title">{title}</h2>
        <div className="faqBox" />
      </div>
    </FaqStyles>
  )
}

export default Faq

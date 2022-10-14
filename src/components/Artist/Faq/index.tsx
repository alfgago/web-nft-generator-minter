import { FaqStyles } from "./FaqStyles"

const Faq = ({ title, items }: any) => {
  return (
    <FaqStyles>
      <div className="content">
        <h2 className="title">{title}</h2>
        <div className="faqBox">
          <ul>
            <li className="active">What are Guest List NFTs?</li>
            <li>How do I purchase a Guest List NFT?</li>
            <li>How do I use my NFT to access an artist's guest list?</li>
          </ul>
          <div className="answer">ANSWER</div>
        </div>
      </div>
    </FaqStyles>
  )
}

export default Faq

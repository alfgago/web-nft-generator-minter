import { ReactSVG } from "react-svg"

import Button from "../Common/Button"
import SimpleHeader from "../Common/SimpleHeader"

import { AboutStyles, PoweredByStyles } from "./AboutStyles"
import GoalHelp from "./GoalHelp"
import RoadMap from "./RoadMap"
import Team from "./Team"

const About = ({ page }: any) => {
  const attributes = page.attributes

  const title = attributes.title ? attributes.title : "About"
  const bannerDescription = attributes.banner_description
    ? attributes.banner_description
    : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non perspiciatis cumque quo ad, nam eum."
  const goal = attributes.goal ? attributes.goal : ""
  const helpArtists = attributes.help_artists ? attributes.help_artists : ""
  const roadMapCol1 = attributes.roadMap[0].columnData
  const roadMapCol2 = attributes.roadMap[1].columnData
  const poweredTitle = attributes.poweredByTitle
  const teamList = attributes.teamRow
  const teamPageDescrip = attributes.team

  return (
    <AboutStyles>
      <SimpleHeader title={title} textAlign="left">
        <div className="cont">
          <div className="cont-desc">
            <p
              dangerouslySetInnerHTML={{
                __html: bannerDescription,
              }}
            />
          </div>
          <ReactSVG
            className="white-star"
            src="/assets/icons/about-stars.svg"
          />
        </div>
      </SimpleHeader>
      <GoalHelp goal={goal} helpArtists={helpArtists} />

      <RoadMap columnData1={roadMapCol1} columnData2={roadMapCol2} />
      <PoweredByStyles>
        <div className="content">
          <h2>{poweredTitle}</h2>
        </div>
      </PoweredByStyles>
      <Team pageData={teamPageDescrip} teamList={teamList} />
    </AboutStyles>
  )
}

export default About

import { ReactSVG } from "react-svg"

import Button from "../Common/Button"
import SimpleHeader from "../Common/SimpleHeader"

import { AboutStyles } from "./AboutStyles"
import GoalHelp from "./GoalHelp"
import RoadMap from "./RoadMap"

const About = ({ page }: any) => {
  return (
    <AboutStyles>
      <SimpleHeader title="About" textAlign="left">
        <div className="cont">
          <div className="cont-desc">
            <p>{page.banner_description}</p>
          </div>
          <div className="cont-stars">
            <ReactSVG
              className="white-star"
              src="/assets/icons/about-stars.svg"
            />
          </div>
        </div>
      </SimpleHeader>
      <GoalHelp goal={page.goal} helpArtists={page.help_artists} />

      <RoadMap
        columnData1={page.roadMap.column_data_1}
        columnData2={page.roadMap.column_data_2}
      />
    </AboutStyles>
  )
}

export default About

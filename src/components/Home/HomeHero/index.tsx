import { useEffect, useState } from "react";
import Link from "next/link";
import { useAddress, useMetamask } from "@thirdweb-dev/react";

import { CommonPill } from "@/components/Common/CommonStyles";
import GradientBackground from "@/components/Common/GradientBackground";
import Modal from "@/components/Common/Modal";
import UserSignUp from "@/components/UserSignup";
import cleanUrl from "@/utils/cleanUrl";

import ShowsCarousel from "../ShowsCarousel";

import { HomeHeroStyles } from "./HomeHeroStyles";

const HomeHero = ({ title, copy, image }) => {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const [toggleEdit, setToggleEdit] = useState(false);

  return (
    <HomeHeroStyles>
      <div
        className="background"
        style={{
          backgroundImage: image.data
            ? `url(${cleanUrl(image.data.attributes.url)})`
            : "",
        }}
      />
      <div className="watermark" />

      <div className="svgs">
        <div className="banner-logo content">
          <GradientBackground
            className="grad"
            hasGrain={false}
            customCanvas="gradient-canvas-logo"
          />
        </div>
        <div className="upcoming-svg content">
          <GradientBackground
            className="grad"
            hasGrain={false}
            customCanvas="gradient-canvas-up"
          />
        </div>
      </div>
      <div className="content screen">
        <div className="left">
          <h1 className="title">{title}</h1>
          {copy && <div className="copy">{copy}</div>}

          <div className="ctas">
            {!address ? (
              <span className="signup" onClick={connectWithMetamask}>
                <CommonPill className="btn clickable fill">Sign Up</CommonPill>
              </span>
            ) : (
              <Link className="signup" href="/my-passes">
                <CommonPill className="btn clickable fill">
                  See Passes
                </CommonPill>
              </Link>
            )}
            <a className="marketplace" href="https://market.plusonemusic.io">
              <CommonPill className="btn clickable">
                Visit Marketplace
              </CommonPill>
            </a>
          </div>
        </div>
      </div>
      <div className="abs">
        <div className="content">
          <div className="right">
            <ShowsCarousel />
          </div>
        </div>
      </div>

      {toggleEdit && (
        <Modal setIsOpen={setToggleEdit} title="Sign Up">
          <UserSignUp />
        </Modal>
      )}
    </HomeHeroStyles>
  );
};

export default HomeHero;

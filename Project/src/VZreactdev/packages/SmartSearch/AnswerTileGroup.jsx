import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";

import { TileGroup, Tile } from "vz-odt-modules/Tile";
import Button from "vz-odt-components/Button/Button";

const AnswerTileGroup = ({
  answerTiles,
  isOpen,
  herosearchChanged,
  herosearchFocused,
  herosearchValue
}) => {
  return (
    <React.Fragment>
      {!herosearchFocused &&
        isOpen &&
        !herosearchChanged && (
          <React.Fragment>
            <TileGroup
              isCarousel={false}
              style={{ zIndex: 9 }}
              isAnswerTile={true}
            >
              <AnswerTileList answerTiles={answerTiles} />
            </TileGroup>
            {answerTiles && (
              <MoreResultsButtonContainer>
                <MoreResultsButton kind={Button.BUTTON_TYPE.SECONDARY}>
                  <AnchorLink
                    href={
                    herosearchValue ? reactGlobals.searchDomain ? (
                      reactGlobals.searchDomain + herosearchValue
                    ) : (
                      "/search/vzwSearch?N=129&Ntt=" + herosearchValue
                    ) : (
                      "//search.verizonwireless.com"
                    )
                    }
                  >
                    See more results
                  </AnchorLink>
                </MoreResultsButton>
              </MoreResultsButtonContainer>
            )}
          </React.Fragment>
        )}
    </React.Fragment>
  );
};

const AnswerTileList = ({ answerTiles }) => {
  const animatedIn = true;
  return answerTiles
    ? answerTiles.map((tile, index) => {
        return (
          <Tile
            key={"tile" + index}
            overline={tile.eyebrow}
            headline={tile.heading}
            subheader={tile.subheading}
            subheaderline2={tile.subheading2}
            ctaBtnText={tile.ctaBtnText}
            type={"search"}
            ctaClick={() => {
              if (tile.action && tile.action.url) {
                window.location.href = tile.action.url;
              } else if (tile.action && tile.action.function_name) {
                eval(tile.action.function_name);
              }
            }}
            alertMode={tile.alertMode}
            icon={tile.icon}
            trendingMode={tile.trendingMode}
            animatedIn={animatedIn}
            animationDelay={index / 8 + "s"}
            image={tile.image}
            barValue={tile.barValue}
            barBaseValue={tile.barBaseValue}
            barLabelText={tile.barLabelText}
            lightMode={tile.lightMode}
            fullscreenImage={tile.fullscreenImage}
            isAnswerTile={true}
            background={tile.background}
            inverted={tile.background === "black" ? true : false}
          >
            {tile.content}
          </Tile>
        );
      })
    : ["", "", "", ""].map((tile, index) => {
        return (
          <Tile
            key={"tile" + index}
            animatedIn={animatedIn}
            animationDelay={index / 8 + "s"}
            fullscreenImage={tile.fullscreenImage}
            isAnswerTile={true}
            loading={true}
          />
        );
      });
};

const MoreResultsButtonContainer = styled.div`
  position: relative;
  max-width: 79.5rem;
  margin: .1875rem auto 0 auto;
  z-index: 9;
`;

const MoreResultsButton = styled(Button)`
  position: relative;
  z-index: 9020;
  margin-left: 1.25rem;
  margin-bottom: 2rem;
  width: 11.5625rem !important;
  height: 2.625rem !important;
`;

const AnchorLink = styled.a`
  text-decoration: none;
  color: black;
  font-size: 1rem;
`;
export default AnswerTileGroup;

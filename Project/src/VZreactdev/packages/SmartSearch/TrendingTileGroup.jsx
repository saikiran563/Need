import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styled from "styled-components";

import { TileGroup, Tile } from "vz-odt-modules/Tile";
import Button from "vz-odt-components/Button/Button";

import { media } from "../../util/style";

import VendorScripts from "vz-odt-components/VendorScripts/VendorScripts";

const TrendingTileGroup = ({
  trendingTiles,
  isOpen,
  mobileHeadLineStack,
  herosearchChanged,
  herosearchFocused,
  herosearchValue
}) => {
  return (
    <React.Fragment>
      {herosearchFocused &&
        isOpen &&
        !herosearchChanged && (
          <React.Fragment>
            <TileGroup
              isCarousel={false}
              style={{ zIndex: 9 }}
              className={mobileHeadLineStack ? "stackListCtr" : ""}
            >
              <TrendingTileList
                trendingTiles={trendingTiles}
                classPropTL={mobileHeadLineStack ? "stackList" : ""}
              />
            </TileGroup>
          </React.Fragment>
        )}
    </React.Fragment>
  );
};

const TrendingTileList = ({ trendingTiles, classPropTL }) => {
  const animatedIn = true;

  return trendingTiles
    ? trendingTiles.map((tile, index) => {
        let vzwDLPagePCI = tile.vzwDLPagePCI;
        return (
          <Tile
            key={"tile" + index}
            overline={_.get(tile, "tileCategory")}
            headline={_.get(tile, "tileSectionTop.tileHeader[0]")}
            subheader={_.get(tile, "tileSectionTop.tileSubHeader")}
            className={classPropTL}
            ctaBtnText={""}
            type={"search"}
            ctaClick={() => {
              if (_.has(tile, "tileSectionBottom.tileLink")) {
                window.location.href = _.get(
                  tile,
                  "tileSectionBottom.tileLink"
                );
              }
            }}
            alertMode={tile.alertMode}
            icon={tile.icon}
            trendingMode={true}
            animatedIn={animatedIn}
            animationDelay={index / 8 + "s"}
            image={tile.image}
            barValue={tile.barValue}
            barBaseValue={tile.barBaseValue}
            barLabelText={tile.barLabelText}
            lightMode={tile.lightMode}
            fullscreenImage={tile.fullscreenImage}
            hideHorizontalRule={true}
            isAnswerTile={true}
            siteCatPerContentImp={vzwDLPagePCI}
          />
        );
      })
    : null;
};

const MoreResultsButtonContainer = styled.div`
  position: relative;
  max-width: 79.5rem;
  margin: 0 auto 0 auto;

  ${media.mobile`
    display: none;
  `};
`;

const MoreResultsButton = styled(Button)`
  position: relative;
  z-index: 9020;
  margin-left: 1.25rem;
  margin-bottom: 2rem;
`;
const AnchorLink = styled.a`
  text-decoration: none;
  color: black;
`;

TrendingTileGroup.propTypes = {
  trendingTiles: PropTypes.array
};
export default TrendingTileGroup;

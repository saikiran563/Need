import React from "react";
import styled, { keyframes } from "styled-components";
import { ScaleDownFadeInAnimation } from "./TileAnimations";
import { media, isMobile } from "../../util/style";

const loadingImage =
  "'data:image/png;base64,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'";

const FullScreenImage = ({
  fullscreenImage,
  visible,
  loading,
  device,
  promoTile
}) => {
  if (fullscreenImage === reactGlobals.devPromo1Img && promoTile && isMobile) {
    fullscreenImage = reactGlobals.devPromo1ImgMob;
  }
  if (fullscreenImage === reactGlobals.devPromo2Img && promoTile && isMobile) {
    fullscreenImage = reactGlobals.devPromo2ImgMob;
  }
  if (fullscreenImage === reactGlobals.recPromoImg && promoTile && isMobile) {
    fullscreenImage = reactGlobals.recPromoImgMob;
  }
  let fullscreenImageComp = fullscreenImage ? (
    <Wrapper device={device} promoTile={promoTile}>
      {fullscreenImage && (
        <Img
          device={device}
          promoTile={promoTile}
          src=""
          fullscreenImage={`url(${fullscreenImage})`}
        />
      )}
    </Wrapper>
  ) : null;

  if (!fullscreenImageComp && loading) {
    fullscreenImageComp = (
      <Wrapper>
        <Img device={device} src="" fullscreenImage={`url(${loadingImage})`} />
      </Wrapper>
    );
  }

  return fullscreenImageComp;
};

const Wrapper = styled.div`
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

const Img = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: scale(1.3);
  opacity: 0;
  background-position: center;
  background-image: ${props => props.fullscreenImage};
  ${ScaleDownFadeInAnimation()};
`;

export default FullScreenImage;

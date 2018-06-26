import React from 'react'
import styled, { css } from 'styled-components'

const TileVideo = ({ video }) => {
  const videoComp = video ? (
    isGIF(video) ? (
      <StyledTileVideo>
        <img src={video} />
      </StyledTileVideo>
    ) : (
      <StyledTileVideo>
        <video autoPlay muted loop>
          <source src={video} />
        </video>
      </StyledTileVideo>
    )
  ) : null
  return videoComp
}

const isGIF = fileName => {
  let ext = fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2)
  console.log('video ext = ' + ext)
  return ext == 'gif'
}

const StyledTileVideo = styled.div`
  position: absolute;
  padding: 0;
  width: 100%;
  left: 0;
  bottom: 0;
  height: 100%;
  overflow-x: hidden;
  video,
  img {
    position: relative;
    left: 0;
    margin-bottom: -4px;
    height: 100%;
  }
`
export default TileVideo

import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TileGroup, Tile } from "./index.js";


storiesOf("Tile", module).add("Group of 3 Tiles", () => (
  <section Style="max-height:500px;display:block;">
      <div>
        <TileGroup isCarousel={true}>
          <Tile
            key={0}
            overline={"eyebrow"}
            headline={"Lorem ipsum dolor sit amet."}
            subheader={""}
            ctaBtnText={""}
            ctaClick={() => {
              window.location.href = "http://vzw.com";
            }}
            alertMode={false}
            loading={false}
            icon={undefined}
            trendingMode={false}
            animatedIn={true}
            animationDelay={0 / 2 + "s"}
            image={undefined}
            barValue={true}
            barBaseValue={undefined}
            barLabelText={"tile.barLabelText"}
            lightMode={false}
            fullscreenImage={undefined}
          >
            {["a", "b", "c"].map(function(item, key) {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
          </Tile>
          <Tile
            key={1}
            overline={"eyebrow"}
            headline={"Lorem ipsum dolor sit amet."}
            subheader={""}
            ctaBtnText={""}
            ctaClick={() => {
              window.location.href = "http://vzw.com";
            }}
            alertMode={false}
            loading={false}
            icon={undefined}
            trendingMode={false}
            animatedIn={true}
            animationDelay={1 / 2 + "s"}
            image={undefined}
            barValue={true}
            barBaseValue={undefined}
            barLabelText={"tile.barLabelText"}
            lightMode={false}
            fullscreenImage={undefined}
          >
            {["a", "b", "c"].map(function(item, key) {
              return (
                <span key={key}>
                  {item}
                  <br />
                </span>
              );
            })}
          </Tile>
        </TileGroup>
      </div>
  </section>
));

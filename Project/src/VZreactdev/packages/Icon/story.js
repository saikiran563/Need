import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ICONS } from "../Icon/Icon-assets";
import Icon from "../Icon/Icon";

import { withKnobs, text, number } from "@storybook/addon-knobs/react";

const typist_story = storiesOf("Icons", module);

typist_story.addDecorator(withKnobs);

typist_story.add("Chat", () => {
  return <Icon icon={ICONS.CHAT} />;
});

typist_story.add("Mic", () => {
  return <Icon icon={ICONS.MIC} />;
});

typist_story.add("Magnifier", () => {
  return <Icon icon={ICONS.MAGNIFIER} />;
});

typist_story.add("Home", () => {
  return <Icon icon={ICONS.HOME} />;
});

typist_story.add("Chevron Right", () => {
  return <Icon icon={ICONS.CHEVRON_RIGHT} />;
});

typist_story.add("Chevron Down", () => {
  return <Icon icon={ICONS.CHEVRON_DOWN} />;
});

typist_story.add("Cancel", () => {
  return <Icon icon={ICONS.CANCEL} />;
});

typist_story.add("Dollar Sign", () => {
  return <Icon icon={ICONS.DOLLAR_SIGN} />;
});

typist_story.add("Shopping Cart", () => {
  return <Icon icon={ICONS.SHOPPING_CART} />;
});

typist_story.add("VZ Logo", () => {
  return <Icon icon={ICONS.VZ_LOGO} />;
});

typist_story.add("Menu", () => {
  return <Icon icon={ICONS.MENU} />;
});

typist_story.add("Weather Snow", () => {
  return <Icon icon={ICONS.WEATHER_SNOW} />;
});

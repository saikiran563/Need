import { configure } from "@storybook/react";

function loadStories() {
  require("../packages/Tile/story.js");
  require("../packages/Typist/story.js");
  require("../packages/SmartSearch/story.js");
  require("../packages/Icon/story.js");
  require("../packages/Header/story.js");
  require("../packages/Button/story.js");
  require("../packages/Modal/story.js");
}

configure(loadStories, module);

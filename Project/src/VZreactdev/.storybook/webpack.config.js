const path = require("path");
module.exports = (storybookBaseConfig, configType, defaultConfig) => {
  defaultConfig.resolve = {
    alias: {
      "vz-odt-styles": path.resolve(__dirname, "../packages/styles"),
      "vz-odt-components": path.resolve(__dirname, "../packages"),
      "vz-odt-modules": path.resolve(__dirname, "../packages")
    }
  };
  return defaultConfig;
};

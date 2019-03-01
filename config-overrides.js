const {
  override,
  fixBabelImports,
  addLessLoader,
} = require("customize-cra");


module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd", libraryDirectory: "es", style: true // change importing css to less
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
                "@primary-color": "#000000",
                "@success-color": "#00FFFF",
                "@error-color": "#FF00FF" 
              }
  })
);
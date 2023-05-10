const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "vue_instagram",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    workboxOptions: {
      exclude: [/\.map$/, /manifest\.json$/, "index.html"],
    },
  },
});

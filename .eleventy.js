const isProduction = process.env.DEPLOYMENT_ENV === 'production';

module.exports = (eleventyConfig) => {
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addWatchTarget("./src/js/");
  eleventyConfig.addPassthroughCopy("./src/static");
  eleventyConfig.addFilter("keys", obj => Object.keys(obj));
  eleventyConfig.addFilter("except", (arr=[]) => arr.filter(value => value != "all").sort());
  eleventyConfig.setBrowserSyncConfig(
    isProduction ? {
      ghostMode: false,
    } : {
    middleware(_req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
    }
  });
  
  return {
    templateFormats: [
      "md",
      "njk"
    ],

    dir: {
      input: "src",
      output: "dist"
    },
    markdownTemplateEngine: "njk"
  }
}

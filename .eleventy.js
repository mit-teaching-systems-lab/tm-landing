const isProduction = process.env.DEPLOYMENT_ENV === 'production';

const middleware = (_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
};

module.exports = (eleventyConfig) => {
  eleventyConfig.addWatchTarget("./src/css/");
  eleventyConfig.addWatchTarget("./src/js/");
  eleventyConfig.addPassthroughCopy("./src/static");
  eleventyConfig.addFilter("keys", obj => Object.keys(obj));
  eleventyConfig.addFilter("except", (arr=[]) => arr.filter(value => value != "all").sort());
  eleventyConfig.setBrowserSyncConfig(
    isProduction ? {
      ghostMode: false,
      middleware,
    } : {
      middleware,
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

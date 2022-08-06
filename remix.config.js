/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: "src",

  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "api/_build",
  ignoredRouteFiles: [".*"],
  routes(defineRoutes) {
    return defineRoutes(route => {
      route("/:language/", "routes/index.tsx");
      route("/:language/post/:slug", "routes/post/$slug.tsx");
    });
  }
};

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app: any) {
	app.use(
		"/courses",
		createProxyMiddleware({
			target: "https://courses.edx.org",
			changeOrigin: true,
			headers: {
				"X-Requested-With": "XMLHttpRequest",
			},
		})
	);
};

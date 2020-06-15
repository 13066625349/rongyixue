let TransformModulesPlugin = require('webpack-transform-modules-plugin');
//路径别名
const path = require('path');

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	lintOnSave: true,
	//路径别名
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', resolve('src'))
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'))
			.set('pages', resolve('src/pages'))
			.set('static', resolve('src/static'))
	},
	//配置webpack
	configureWebpack: {
		plugins: [
			new TransformModulesPlugin()
		]
	},
	assetsDir:"static",//静态资源目录
	devServer: {
		disableHostCheck: true,
		//跨域
		proxy: {
			'/apis': {
				// target: 'https://admin.rongyixue.vip',//正式环境
				target: 'http://jxc.zxceo888.cn',//测试环境
				changeOrigin: true,
				pathRewrite: {
					'^/apis': ''
				}
			},
		}
	},
	outputDir: 'dist',
	publicPath: './',
	// // 生产环境是否生成 sourceMap 文件
	productionSourceMap: true,

	//多页应用
	pages: {

		register: {
			entry: "src/pages/register/main.js",
			template: "src/pages/register/register.html",
			filename: 'register.html'
		},
		product: {
			entry: "src/pages/product/main.js",
			template: "src/pages/product/product.html",
			filename: 'product.html'
		},
		payRecord: {
			entry: "src/pages/payRecord/main.js",
			template: "src/pages/payRecord/payRecord.html",
			filename: 'payRecord.html'
		},
		myInfo: {
			entry: "src/pages/myInfo/main.js",
			template: "src/pages/myInfo/myInfo.html",
			filename: 'myInfo.html'
		},
		myInfo1: {
			entry: "src/pages/myInfo1/main.js",
			template: "src/pages/myInfo1/myInfo.html",
			filename: 'paySuccess.html'
		},
		scanQRCode: {
			entry: "src/pages/scanQRCode/main.js",
			template: "src/pages/scanQRCode/scanQRCode.html",
			filename: 'scanQRCode.html'
		},
		activities: {
			entry: "src/pages/activities/main.js",
			template: "src/pages/activities/activities.html",
			filename: 'activities.html'
		},
		teacher: {
			entry: "src/pages/teacher/main.js",
			template: "src/pages/teacher/teacher.html",
			filename: 'teacher.html'
		},
		shareVideo: {
			entry: "src/pages/shareVideo/main.js",
			template: "src/pages/shareVideo/shareVideo.html",
			filename: 'shareVideo.html'
		},
		course: {
			entry: "src/pages/course/main.js",
			template: "src/pages/course/course.html",
			filename: 'course.html'
		},
		plan: {
			entry: "src/pages/plan/main.js",
			template: "src/pages/plan/plan.html",
			filename: 'plan.html'
		}

	}
}
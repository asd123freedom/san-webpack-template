# 基于 webpack 和 san-loader 的SPA框架
## 如何使用

```
npm install
npm run dev
npm run release
```

## 模板。
- 项目中为单页面应用提供了一个 html 文件`template/index.html`, 项目默认使用的也是这个配置文件。
- 如果想在项目中使用模板引擎语法实现对单页面`index.html`的定制，项目也提供了`template/mip.ejs`这个使用 ejs 的例子，更多使用模板引擎的方法请参考[The template option](https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md)

## 状态管理
项目中引入了 san-store，是 san 框架配套的状态管理方案，`src/mip/list/actions.js`就是一个包含有 action的小例子。文档在[san-store](https://github.com/ecomfe/san-store)。

## 路由
项目使用的路由是 [san-router](https://github.com/ecomfe/san-router)，项目的src代码中已经提供一个左侧菜单的例子，该菜单支持子菜单，路由的配置项在`src/mip/routes.js`当中，示例如下：

``` JSON
{
     rule: '/mip/list/import',
     Component: ImportList,
     data: {
         nav: '/mip/list/import'
     }
}
```

- `nav`参数帮助我们在菜单栏实现 `active`的效果
同时在 common文件夹下也有之前项目积累的`routeTo`方法。
对于`menu`的配置在入口文件当中填写即可。

## 本地mock
目前项目中使用的还是本地 mock方案，使用的是一个 express中间件[autoresponse](https://github.com/wuhy/autoresponse)，在 `mock`文件夹中有例子，引入方式参考`tool/dev-server.js`文件中的写法，在使用之前，一定要将请求的前缀配置在中间件的正则表达式中

``` javascript
app.use(autoresponse({
    ...
    get: {
        match: function (reqPathName) {
            return !/\.(html|js|map)$/.test(reqPathName) && /^\/(cms)(.*)/.test(reqPathName);
        }
    }
}));
```

## CSS
团队在 CSS 前选择器方面的技术选型是[stylus](http://stylus-lang.com/)，同时有一个库可以帮助我们快速开发，叫做[rider](https://github.com/ecomfe/rider)，项目中 `webpack`的配置已经集成了相关配置。

## 构建
运行`npm run release`可以执行构建，构建产物默认是在`dist`文件当中，项目提供了能够在 `agile`下编译的脚本，具体的配置在`BCLOUD`文件与`build.sh`文件当中

## 环境变量
构建过程中的环境变量使用的是`webpack.DefinePlugin`，定义了一个变量`process.env.NODE_ENV`，该变量有两个值，`dev`和`production`，具体环境变量的使用请参考文档[definePlugin](https://webpack.js.org/plugins/define-plugin/#components/sidebar/sidebar.jsx)。

## 入口文件与 feRoot
入口文件与 feRoot的配置均保存在`tool/entry.js`里面。按照之前的设想，feRoot的配置理论上由我们 fe管理，项目中对feRoot的处理在`tool/build.js`当中。

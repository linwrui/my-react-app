/* config-overrides.js */
// npm: https://www.npmjs.com/package/react-app-rewired

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  // 引入 lessLoader，注意 lessLoader 要用低版本，否则可能出现 getOptions 为空的BUG
  // injectBabelPlugin is broken in react-app-rewired 2.0.1 · Issue #348 · timarney/react-app-rewired
  // https://github.com/timarney/react-app-rewired/issues/348#issuecomment-452199363
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      // 这里可以配置一些默认的 less 变量
      // '@primary-color': '#1DA57A'
    },
  })
);

function CopyRightWebpackPlugin(options = {}) {
  return {
    name: 'CopyrightWebpackPlugin',
    transform(code, id) {
      // console.log('code: ', code, id)
      return {
        code: code,
      };
    },
  }
  // apply(compiler) {
  //   // emit 钩子是生成资源到 output 目录之前执行，emit 是一个异步串行钩子，需要用 tapAsync 来注册
  //   compiler.hook.emit.tapAsync('CopyrightWebpackPlugin', (compilation, callback) => {
  //     // 回调方式注册异步钩子
  //     const copyrightText = '版权归 x_jun 所有'
  //     // compilation存放了这次打包的所有内容
  //     // 所有待生成的文件都在它的 assets 属性上
  //     compilation.assets['copyright.txt'] = {
  //       // 添加copyright.txt
  //       source: function () {
  //         return copyrightText
  //       },
  //       size: function () {
  //         // 文件大小
  //         return copyrightText.length
  //       },
  //     }
  //     callback() // 必须调用
  //   })
  // }
}

export default CopyRightWebpackPlugin
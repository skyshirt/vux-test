'use strict'

const viewPath = '/viewsbasic'
// const jsonPath = '../src/vip_list.json'
const routePath = '/'

const path = require('path')
const fs = require('fs')
// const viewsPath = path.resolve(__dirname, jsonPath)
const argv = require('yargs').argv
argv.simulate = argv.simulate || false

module.exports = {
  options: {
    vuxDev: !argv.simulate, // true
    vuxSetBabel: argv.simulate, // false
    vuxWriteFile: false,
    env: 'dev'
  },
  plugins: [
    'vux-ui', 'inline-manifest', 'progress-bar', 'duplicate-style',
    {
      name: 'js-parser',
      test: /\.js/,
      fn: function (source) {
        // this.addDependency(viewsPath)
        // let list = fs.readFileSync(viewsPath, 'utf-8')
        // list = JSON.parse(list)
        let str = []
        // list.forEach(one => {
        //   let filename = one
        //   let path = `${routePath}${toDash(one)}`
        //   if (/#/.test(one)) {
        //     filename = one.split('#')[0]
        //     path = one.split('#')[1]
        //   }
        //   str.push(`{
        //     path: '${path}',
        //     component: () => import('.${viewPath}/${filename}.vue').then(m => m.default)
        //   }`)
        // })
        // if (argv.platform === 'app') {
        //   str.push(`{
        //     path: '/test/app',
        //     component: function (resolve) {
        //       require(['./demos/AppTest.vue'], resolve)
        //     }
        //   }`)
        // }

        // 404 page
        str.push(`{
          path: '*',
          component: () => import('.${viewPath}/NotFoundComponent.vue').then(m => m.default)
        }`)
        str = `[${str.join(',\n')}]`
        source = source.replace('const routes = []', 'const routes = ' + str)
        return source
      }
    },
    {
      name: 'less-theme',
      path: 'src/theme.less'
    }
  ]
}

function toDash(str) {
  return str.replace(/([A-Z])/g, function (m, w) {
    return '-' + w.toLowerCase();
  }).replace('-', '')
}

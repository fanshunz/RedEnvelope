const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const axios = require('axios')
const webpack = require('webpack')
const MemoryFS = require('memory-fs')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)

const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

let bundle

serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  console.log(err)
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(err))

  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle output success.')
})

const handleSSR = async ctx => {
  // 如果bundle还不存在
  if (!bundle) {
    ctx.body = 'please wait a moment.'
    return
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8090/public/vue-ssr-client-manifest.json'
  )

  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer
    .createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    })

  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router

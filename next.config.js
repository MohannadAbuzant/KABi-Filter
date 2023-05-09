const path = require('path')
const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  sassOptions: {
  fiber: false,
  includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig

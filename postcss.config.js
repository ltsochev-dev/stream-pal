module.exports = {
  plugins: {
    tailwindcss: {},
    'postcss-nested': {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  },
}

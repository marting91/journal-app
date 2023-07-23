module.exports = {
  presets: [
      [ '@babel/preset-env', { targets: { esmodules: true } } ],
      [ '@babel/preset-react', { runtime: 'automatic' } ],
  ],
  // For loading VITE_ environment variables in JEST
  plugins: [
    function() {
      return {
        visitor: {
          MetaProperty(path) {
            path.replaceWithSourceString('process')
          }
        }
      }
    }
  ]
};
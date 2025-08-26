export default {
  content: [
    // 添加你需要提取的文件目录
    'src/**/*.{js,ts,tsx,vue}'
  ],
  theme: {
    extend: {}
  },
  plugins: [],
  corePlugins: {
    preflight: false,
    container: false
  }
}

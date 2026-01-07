import markdown from 'markdown-it'
import hljs from 'highlight.js'
// import anchor from 'markdown-it-anchor'

export function useMarkdownIt(mdString: string) {
  const md = markdown({
    html: true,
    xhtmlOut: true,
    breaks: true,
    linkify: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value
        } catch (error) {
          console.error(error)
        }
      }
      return '' // 使用外部默认转义
    }
  })

  //   .use(anchor, {
  //   permalink: anchor.permalink.headerLink(),
  //   slugify: function (str: string) {
  //     return decodeURIComponent(
  //       str
  //         .trim()
  //         .toLowerCase()
  //         // 处理章节编号格式（如 5.1, 2.3 等）
  //         .replace(/(\d+)\.(\d+)/g, '$1-dot-$2')
  //         // 移除特殊字符，但保留字母、数字、中文、连字符和点号
  //         .replace(/[^\w\u4e00-\u9fa5\-\.]/g, '')
  //         // 恢复章节编号格式
  //         .replace(/-dot-/g, '.')
  //         // 将空格替换为连字符
  //         .replace(/\s+/g, '-')
  //         // 确保不以数字开头（添加前缀）
  //         .replace(/^(\d)/, 'section-$1')
  //         // 清理多余的连字符
  //         .replace(/^-+/, '')
  //         .replace(/-+$/, '')
  //     )
  //   }
  // })

  const htmlString = mdString ? md.render(mdString) : ''

  return {
    md,
    htmlString
  }
}

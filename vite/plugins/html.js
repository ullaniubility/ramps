import { createHtmlPlugin } from 'vite-plugin-html'

const copyright_common_style = 'font-size: 14px; margin-bottom: 2px; padding: 6px 8px; color: #fff;'
const copyright_main_style = `${copyright_common_style} background: #e24329;`
const copyright_sub_style = `${copyright_common_style} background: #707070;`
const copyright_sub_time = JSON.stringify(new Date().toLocaleString())

export default function createHtml(env, isBuild) {
    const { VITE_APP_TITLE, VITE_APP_DEBUG_TOOL, VITE_APP_PRIMITIVE } = env
    const html = createHtmlPlugin({
        inject: {
            data: {
                title: VITE_APP_TITLE,
                debugTool: VITE_APP_DEBUG_TOOL,
                copyrightScript: `
                <script>
                    console.info('%c由%cTiam%c提供技术支持', '${copyright_sub_style}', '${copyright_main_style}', '${copyright_sub_style}');
                    console.log(${copyright_sub_time})
                </script>
                `,
                localScript: VITE_APP_PRIMITIVE === 'true' ? `
                <script>
                    (function (win) {
                        // 获取页面所有的 <script > 标签对象
                        let scripts = document.getElementsByTagName('script')
                        // 遍历标签
                        for (let i = 0; i < scripts.length; i++) {
                            // 提取单个<script > 标签对象
                            let script = scripts[i]
                            // 获取标签中的 src
                            let url = script.getAttribute("src")
                            // 获取标签中的 type
                            let type = script.getAttribute("type")
                            // 获取标签中的js代码
                            let scriptText = script.innerHTML
                            // 如果有引用地址或者 type 属性 为 "module" 则代表该标签需要更改
                            if (url || type === "module") {
                                // 创建一个新的标签对象
                                let tag = document.createElement('script');
                                // 设置src的引入
                                tag.setAttribute('url', url);
                                // 设置js代码
                                tag.innerHTML = scriptText
                                // 删除原先的标签
                                script.remove()
                                // 将标签添加到代码中
                                document.getElementsByTagName('head')[0].appendChild(tag)
                            }
                        }
                    })(window)
                </script>
                ` : 
                ''
            }
        },
        minify: true
    })
    return html
}

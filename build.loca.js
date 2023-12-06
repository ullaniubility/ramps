// 导入必要的模块 
// const path = require('path')
// const fs = require('fs');
// const cheerio = require('cheerio');

// 导入html文件
// const defaultPath = path.resolve(__dirname, './')
// const html = fs.readFileSync(`${defaultPath}/dist/index.html`, 'utf-8')

// // 加载html文件
// const $ = cheerio.load(html);

// // 遍历body里面的script标签
// $('html script').each(function () {
//     // 获取script标签
//     const script = $(this);
//     const type = script.attr('type');
//     // const type = script.attr('type');
//     // 如果type属性值为module，则去掉type属性
//     if (type === 'module') {
//         script.removeAttr('type');
//     }

//     // 把script标签移动到head里面
//     $('head').append(script);
// });

// // 保存修改后的html文件
// fs.writeFileSync('index-new.html', $.html());

// const fs = require('fs'); 
// const path = require('path');

// let htmlFilePath = path.join(__dirname, '/dist/index.html');

// fs.readFile(htmlFilePath, 'utf8', (err, data) => {
//      if (err) { console.log(err); return; }
//       let $ = cheerio.load(data); 
//       let scripts = $('script'); 
//       scripts.each(function (i, elem) { 
//         let scriptObj = { 
//             src: $(elem).attr('src'), 
//             type: $(elem).attr('type'), 
//             content: $(elem).html() 
//         } 
//         if (scriptObj.src || scriptObj.type === 'module') { 
//             let newScript = $(''); 
//             newScript.attr('src', scriptObj.src); 
//             newScript.text(scriptObj.content); 
//             $(elem).remove(); 
//             $('head').append(newScript); 
//         } 
//     }); 
//     let newHtml = $.html(); 
//     fs.writeFile('index-new.html', newHtml, (err) => { 
//         if (err) { console.log(err); return; } 
//         console.log('html文件输出成功'); 
//     }); 
// });

const fs = require('fs'); const path = require('path');

const htmlFilePath = path.resolve(__dirname, './dist/index.html');

fs.readFile(htmlFilePath, 'utf-8', (err, data) => {
    if (err) { throw err; }
    const scripts = data.match(/<script[^>]*>([\s\S]*?)<\/script>/ig);
    scripts.forEach(script => {
        const scriptObj = {
            src: script.match(/src="([^"]*)"/i)[1],
            type: script.match(/type="([^"]*)"/i)[1],
            content: script.match(/<script[^>]*>([\s\S]*?)<\/script>/i)[1]
        };

        if (scriptObj.src || scriptObj.type === 'module') {
            const newScript = `<script type="${scriptObj.type}" src="${scriptObj.src}">${scriptObj.content}</script>`;
            data = data.replace(script, newScript);
        }
    });

    fs.writeFile(htmlFilePath, data, err => {
        if (err) {
            throw err;
        }
        console.log('html文件已经更新');
    });
});




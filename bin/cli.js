#! /usr/bin/env node

const fs = require('fs'); // 引入node文件操作模块
const path = require('path');
const ejs = require('ejs');
const inquirer = require('inquirer'); // 发起命令行交互
const prompt = inquirer.createPromptModule()

const writerDirFile = (dir, dest, ans) => {
    fs.readdir(dir, (err, files) => {
        if(err) throw err;
        // 遍历模板文件，经过 ejs 模板处理之后输出到目标文件
        files.forEach(f => {
            const fPath = path.join(dir, f); // 当前文件/文件夹路径
            const destPath = path.join(dest, f);
            const stat = fs.lstatSync(fPath);
            if(stat.isDirectory()) { // 判断是否问文件夹, 如果是文件夹，先创建文件夹，然后则递归遍历写入文件
                const newDest = path.join(dest, f); // 新的文件目录
                fs.promises.mkdir(newDest).then(() => {
                    writerDirFile(fPath, newDest, ans)
                })
            } else {
                if (/\.html$/.test(f)) { // 使用 ejs 处理HTML模板
                    ejs.renderFile(fPath, ans, (err, result) => {
                        if(err) throw err;
                        // 将转换后的结果输出到目标路径
                        fs.writeFileSync(destPath, result);
                    })
                } else {
                    fs.readFile(fPath, (err, result) => {
                        if(err) throw err;
                        // 将转换后的结果输出到目标路径
                        fs.writeFileSync(destPath, result);
                    });
                }
            }
        })
    })
}

prompt([
    {
        type: 'input',
        name: 'name',
        message: '请输入项目名称',
    },
    {
        type: 'list',
        name: 'type',
        message: '请选择要创建的模块类型',
        choices: ['React', 'Vue', 'Node']
    }
]).then(ans => {
    //  获取模板文件位置
    const temp = path.resolve(__dirname, `../templates/${ans.type.toLowerCase()}/`)
    // 定义目标文件位置，
    const dest = process.cwd();
    // 从模板文件中读取文件，然后将文件经过ejs模板转换，最后输出到目标文件
    writerDirFile(temp, dest, ans)
})
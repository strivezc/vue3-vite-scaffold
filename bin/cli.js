#!/usr/bin/env node

const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

// 获取项目名称
const projectName = process.argv[2];

if (!projectName) {
  console.error("Please specify the project name.");
  process.exit(1);
}

// 获取当前脚本所在目录
const currentDir = process.cwd();

// 定义目标目录
const targetDir = path.join(currentDir, projectName);

// 检查目标目录是否存在
if (fs.existsSync(targetDir)) {
  console.error(`Directory ${projectName} already exists.`);
  process.exit(1);
}

// 复制模板项目
exec(`git clone https://github.com/strivezc/vue3-vite-scaffold ${projectName}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error cloning repository: ${stderr}`);
    process.exit(1);
  }

  console.log(`Project ${projectName} created successfully.`);

  // 安装依赖
  exec(`cd ${projectName} && npm install`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error installing dependencies: ${stderr}`);
      process.exit(1);
    }

    console.log(`Dependencies installed successfully.`);
  });
});

#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e


# 生成静态文件
npm run build

# 源码推送到远程仓库 master 分支
git add -A
git commit -m 'deploy push master'
git push -u github_origin master

# 进入生成的文件夹
cd /dist

# 如果是发布到自定义域名
# cat>CNAME<<EOF
# ylovey.top
# www.ylovey.top
# EOF

# git 操作
git init
git add -A
git commit -m 'deploy'

# 发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:mx623303468/vue-chat.git master:gh-pages

cd -

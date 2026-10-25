# 工商觅食记 🍜

重庆工商大学南岸校区周边美食主题的 Web 课程作业，使用原生 HTML、CSS、JavaScript 实现，无框架、无后端、无数据库。

## 页面与功能

| 页面 | 内容 |
| --- | --- |
| index.html | 选题介绍、11 道美食统计、三个觅食片区入口 |
| foods.html | 校内食堂、回龙湾、五公里·六公里三个分类及图文清单 |
| share.html | 昵称、美食名称、推荐理由、确认勾选组成的投稿表单 |

三个主要交互：分类选项卡切换、投稿表单逐项校验、滚动超过一屏后显示返回顶部按钮。
CSS 包含渐变背景、卡片悬停效果，以及屏幕宽度不超过 680px 时的布局调整。

**投稿功能为前端交互演示：通过校验后显示成功提示并清空表单，不会上传或保存数据。**
图片和价格文字属于课程展示内容。

## 如何运行

这是静态网站，可直接用浏览器打开 index.html；也可以使用编辑器的静态服务器预览。
如已安装 Python，可在项目目录运行：

```sh
python -m http.server 8000
```

然后访问 http://localhost:8000 。

## 文件结构

```text
ctbu-food-site/
├── index.html
├── foods.html
├── share.html
├── css/style.css
├── js/main.js
├── images/
├── IMAGE-CREDITS.txt
└── LICENSE
```

## 公开发布说明

本发布副本从当前本地工作文件生成，使用独立的干净 Git 历史，避免公开原有提交中的个人邮箱。
原项目的本地提交历史保留。发布副本未包含账号凭据或本地 Git 配置。

## 许可

项目原创 HTML、CSS、JavaScript 代码使用 MIT 许可，见 LICENSE。
images/ 中的第三方图片不包含在 MIT 授权范围内；已能从原始图片元数据识别的署名见 IMAGE-CREDITS.txt。

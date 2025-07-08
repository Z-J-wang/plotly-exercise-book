# project-template-vue@3

这是一个 Vue 3 的模板工程项目。在 Vite 版本的 Vue 3 Cli 基础上做了扩展。变动如下：

- 调整 ESlint。引入[eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)插件；增加规则定义；
- 引入 stylelint。`package.json`增加 stylelint 执行命令；
- 增加`.vscode`配置文件。实现保存时自动执行 ESlint 规则来格式化代码；
- 在`env.d.ts`文件中增加`*.vue`文件的声明，解决 ts 无法识别`*.vue`文件产生警告提示问题；
- 改用 yarn 包管理工具；
- 删除`"format": "prettier --write src/"`代码格式化脚本命名，改用 ESlint 脚本格式化代码：`yarn lint:fix`。
- 调整`.prettierrc.json`内的配置；
- 调整单元测试文件目录路径，迁移至`src/tests/`；
- 引入 tailwind 插件；
- 引入三层架构设计思路，调整项目目录结构；

## Project Structure

```
├── .github ------------------------------ GitHub Actions 配置文件
│   └── workflows
├── .vscode ------------------------------ vscode 配置文件
│   └── .editorconfig
│   └── extensions.json
│   └── settings.json
├── api ---------------------------------- 项目HTTP API
├── bll ---------------------------------- 业务逻辑层（根据业务调用数据访问层的接口）
├── dal ---------------------------------- 数据访问层（调用HTTP API请求数据，并根据对应实体组装接口返回的数据）
├── entities ----------------------------- 实体层（定义数据访问层所需的数据实体）
├── public
├── src
│   ├── assets
│   ├── components
│   ├── router
│   ├── store
│   ├── styles
│   ├── utils
│   ├── views
│   ├── App.vue
│   └── main.ts
├── .eslintrc.js
├── .gitignore
├── .prettierrc.json
├── .stylelintrc.json
├── env.d.ts
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Customize configuration

See [Vite Configuration Reference](https://cn.vitejs.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

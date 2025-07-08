# plotly exercise book

plotly.js 练习项目。
plotly.js 网址：https://plotly.com/javascript/

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

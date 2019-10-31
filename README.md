### init 目录

```
vue-chat/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── loading-btn.css
│   │   │   └── loading.css
│   │   └── logo.png
│   ├── components/
│   │   ├── ChatNavBar.vue
│   │   ├── LoginForm.vue
│   │   ├── MessageForm.vue
│   │   ├── MessageList.vue
│   │   ├── RoomList.vue
│   │   └── UserList.vue
│   ├── router/
│   │   └── index.js
│   ├── store/
│   │   ├── actions.js
│   │   ├── index.js
│   │   ├── mutation-type.js
│   │   └── mutations.js
│   ├── views/
│   │   ├── ChatDashboard.vue
│   │   └── Login.vue
│   ├── App.vue
│   ├── chatkit.js
│   ├── init-dir.md
│   ├── init-dir.txt
│   └── main.js
├── babel.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
└── README.md
```

### 新增的依赖

- `@pusher/chatkit-client`, ChatKit 服务的实时客户端界面
- `bootstrap-vue`, CSS 框架
- `dayjs`, 时间格式化工具
- `vue-chat-scroll`, 添加新内容时，它将自动滚动到底部
- `vuex-persist`, 将 Vuex 状态保存在浏览器的本地存储中

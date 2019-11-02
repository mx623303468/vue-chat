import dayjs from 'dayjs'
import store from './store'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

const INSTANCE_LOCATOR = process.env.VUE_APP_INSTANCE_LOCATOR
const TOKEN_URL = process.env.VUE_APP_TOKEN_URL
const MESSAGE_LIMIT = Number(process.env.VUE_APP_MESSAGE_LIMIT) || 10

let currentUser = null
let activeRoom = null

function setMembers() {
  const members = activeRoom.users.map(user => ({
    username: user.id,
    name: user.name,
    presence: user.presence.state
  }))
  store.commit('setUsers', members)
}

async function connectUser(userId) {
  const chatManager = new ChatManager({
    instanceLocator: INSTANCE_LOCATOR,
    tokenProvider: new TokenProvider({ url: TOKEN_URL }),
    userId
  })
  currentUser = await chatManager.connect()
  return currentUser
}

async function subscribeToRoom(roomId) {
  store.commit('clearChatRoom')
  // 订阅房间
  activeRoom = await currentUser.subscribeToRoom({
    roomId, // 房间ID
    messageLimit: MESSAGE_LIMIT, // 限制消息条数
    // 事件钩子
    hooks: {
      // 接收到消息
      onMessage: message => {
        store.commit('addMessage', {
          name: message.sender.name,
          username: message.senderId,
          text: message.text,
          date: dayjs(message.createdAt).format('YYYY-MM-D h:mm:ss a')
        })
      },
      // 用户登录或注销时
      onPresenceChanged: () => {
        setMembers()
      },
      // 用户正在输入
      onUserStartedTyping: user => {
        store.commit('setUserTyping', user.id)
      },
      // 用户停止输入
      onUserStoppedTyping: () => {
        store.commit('setUserTyping', null)
      }
    }
  })
  setMembers()
  return activeRoom
}

export default {
  connectUser,
  subscribeToRoom
}

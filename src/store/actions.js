import chatkit from '../chatkit'

/**
 * 设置错误信息内容
 * @param {*} commit
 * @param {*} error 错误信息
 */
function handleError(commit, error) {
  const message = error.message || error.info.error_description
  commit('setError', message)
}

export default {
  /**
   * 登录方法
   * @param {Object}
   * @param {*} userId 用户ID
   */
  async login({ commit, state }, userId) {
    try {
      // 设置错误信息
      commit('setError', '')
      // 设置 Loading 状态
      commit('setLoading', true)
      // 链接到 chatkit 服务
      const currentUser = await chatkit.connectUser(userId)

      // 设置当前用户
      commit('setCurrentUser', {
        username: currentUser.id,
        name: currentUser.name
      })
      // 设置链接状态
      commit('setReconnect', false)

      // 设置房间列表
      const rooms = currentUser.rooms.map(room => ({
        id: room.id,
        name: room.name
      }))
      commit('setRooms', rooms)

      // 设置房间的用户
      const activeRoom = state.activeRoom || rooms[0] // 上一个使用过的房间，或者第一个

      commit('setActiveRoom', {
        id: activeRoom.id,
        name: activeRoom.name
      })
      await chatkit.subscribeToRoom(activeRoom.id)

      return true
    } catch (error) {
      handleError(commit, error)
    } finally {
      commit('setLoading', false)
    }
  },
  /**
   * 选择房间
   * @param {Object}
   * @param {*} roomId 房间ID
   */
  async changeRoom({ commit }, roomId) {
    try {
      const { id, name } = await chatkit.subscribeToRoom(roomId)
      commit('setActiveRoom', { id, name })
    } catch (error) {
      handleError(commit, error)
    }
  },
  /**
   * 发送消息
   * @param {Object}
   * @param {*} message 消息内容
   */
  async sendMessage({ commit }, message) {
    try {
      commit('setError', '')
      commit('setSending', true)
      const messageId = await chatkit.sendMessage(message)
      return messageId
    } catch (error) {
      handleError(commit, error)
    } finally {
      commit('setSending', false)
    }
  },
  /**
   * 退出登录
   * @param {*}
   */
  async logout({ commit }) {
    commit('reset')
    chatkit.disconnectUser()
    window.localStorage.clear()
  }
}

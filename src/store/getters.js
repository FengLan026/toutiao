const getters = {
  token: state => state.user.token,
  username: state => state.user.userInfo.name,
  userId: state => state.user.userInfo.id,
}
export default getters

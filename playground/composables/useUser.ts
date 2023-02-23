const user = ref(null)
export default () => {
  function setUser(u) {
    user.value = u;
  }
  return [user, setUser];
}
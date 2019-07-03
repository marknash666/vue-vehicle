let contract_address = '0x2daa5ad33ec0ed94dfb91ae72ad40fa1e24e1fda'
window.sessionStorage.token = ''
let userKey =''

export default {
  contract_address,
  userKey,
  getuserKey()
  {
    return window.sessionStorage.token;
  },
  setuserKey(token) {
    window.sessionStorage.token = token;
  }
}

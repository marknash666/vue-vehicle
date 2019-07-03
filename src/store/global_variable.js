let contract_address = '0x2daa5ad33ec0ed94dfb91ae72ad40fa1e24e1fda'

let userKey =''

export default {
  contract_address,
  userKey,
  getuserKey()
  {
    console.log("getuserkey",sessionStorage.token)
    return sessionStorage.token;
  },
  setuserKey(token) {
    console.log("setuserkey",token)
    sessionStorage.token = token;
  }
}

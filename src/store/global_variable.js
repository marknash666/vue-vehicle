let contract_address = '0x4cfd54dee472615d4a9738c433c9668211f0bab3'

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

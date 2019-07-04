let contract_address = '0x015fad918ef7d8ddfab3954b8228555daa465557'

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

const Web3 = require('web3')
const fs = require('fs')
const path = require('path')

var web3 = new Web3()

const alfajoresFaucet = "https://celo.org/developers/faucet"
const filePath = path.join(__dirname, './.secret')

function getAccount() {
    return new Promise(resolve => {
        if(fs.existsSync(filePath)){
            fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
                resolve(web3.eth.accounts.privateKeyToAccount(data))
            })
        } else {
            let randomAccount = web3.eth.accounts.create()

            fs.writeFile(filePath, randomAccount.privateKey, (err) => {
                if(err) {
                    return console.log(err)
                }
            })

            console.log(`Your new Celo Dev account is: ${randomAccount.address}`)
            console.log(`To continue, please fund your new Celo Dev Account from the Alfajores Faucet at: ${alfajoresFaucet}`)
            resolve(randomAccount)
        }
    })
}

// getAccount()

module.exports = {
    getAccount
}
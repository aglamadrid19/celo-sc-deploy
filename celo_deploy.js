const Web3 = require('web3')
const ContractKit = require('@celo/contractkit')
const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
const kit = ContractKit.newKitFromWeb3(web3)

const getAccount = require('./getAccount').getAccount

const MigrationContract = require('./build/contracts/Migrations.json')

async function awaitWrapper(){
    
    let account = await getAccount()
    console.log(account.address)

    kit.connection.addAccount(account.privateKey)

    let tx = await kit.connection.sendTransaction({
        from: account.address,
        data: MigrationContract.bytecode
    })

    const receipt = await tx.waitReceipt()
    console.log(receipt)
}

awaitWrapper()
// Init contractKit

const Kit = require('@celo/contractkit')
const kit = Kit.newKit('https://alfajores-forno.celo-testnet.org')

// Get account - save pk / init account from pk (.secret)

const getAccount = require('./getAccount')

async function awaitWrapper() {
  let account = await getAccount()
  kit.connection.addAccount(account.privateKey)
}

awaitWrapper()

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */
  networks: {
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    alfajores: {
      provider: kit.connection.web3.currentProvider,
      network_id: 44787
    }
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.3"
    }
  },
};

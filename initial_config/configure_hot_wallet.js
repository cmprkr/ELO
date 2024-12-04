const axios = require('axios')

async function configureHotWallet() {
  const hot_wallet_address = "rsk92foj5ALuzrdtXTYKqSCVTkPFRQShAs" // Hot wallet address

  const transaction = {
    TransactionType: "AccountSet",
    Account: hot_wallet_address,
    Flags: 65536 // Enable Require Destination Tags (tfRequireDestTag)
  }

  try {
    // Send transaction payload to Xumm
    const response = await axios.post(
      "https://xumm.app/api/v1/platform/payload",
      { txjson: transaction },
      {
        headers: {
          "x-api-key": "3368dcb4-7002-42de-b5d7-2aacc937ee6a", // Xumm API key
          "x-api-secret": "8848f02b-4a55-4a8f-a51c-23205596f024", // Xumm API secret
          "Content-Type": "application/json"
        }
      }
    )

    console.log("Transaction payload sent to Xumm!")
    console.log("Sign this transaction using Xumm:")
    console.log(response.data.next.always)
  } catch (error) {
    console.error("Error creating transaction payload:", error.response?.data || error.message)
  }
}

configureHotWallet()
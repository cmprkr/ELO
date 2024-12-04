const axios = require('axios')

async function createTrustLine() {
  const recipient_wallet_address = "rwosTMHtC6TgsvXoz4gUJJqfZE2fBXhFRC" // Replace with recipient wallet address
  const cold_wallet_address = "rhT9ZGLJ3sEkCADKQi7odti4E1SA2RQBit" // Replace with your cold wallet address

  const transaction = {
    TransactionType: "TrustSet",
    Account: recipient_wallet_address,
    LimitAmount: {
      currency: "ELO", // Your token name
      issuer: cold_wallet_address,
      value: "1000000" // Trust line limit
    }
  }

  try {
    // Send transaction payload to Xumm
    const response = await axios.post(
      "https://xumm.app/api/v1/platform/payload",
      { txjson: transaction },
      {
        headers: {
          "x-api-key": "3368dcb4-7002-42de-b5d7-2aacc937ee6a", // Replace with your Xumm API key
          "x-api-secret": "8848f02b-4a55-4a8f-a51c-23205596f024", // Replace with your Xumm API secret
          "Content-Type": "application/json"
        }
      }
    )

    console.log("Transaction payload sent to Xumm!")
    console.log("Ask the recipient to sign the trust line transaction using this link:")
    console.log(response.data.next.always)
  } catch (error) {
    console.error("Error creating transaction payload:", error.response?.data || error.message)
  }
}

createTrustLine()
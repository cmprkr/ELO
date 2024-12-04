const axios = require('axios')

async function distributeTokens() {
  const hot_wallet_address = "rsk92foj5ALuzrdtXTYKqSCVTkPFRQShAs" // Replace with your hot wallet address
  const recipient_wallet_address = "rwosTMHtC6TgsvXoz4gUJJqfZE2fBXhFRC" // Replace with recipient wallet address
  const cold_wallet_address = "rhT9ZGLJ3sEkCADKQi7odti4E1SA2RQBit" // Replace with your cold wallet address

  const transaction = {
    TransactionType: "Payment",
    Account: hot_wallet_address,
    Amount: {
      currency: "ELO", // Your token name
      value: "100", // Amount of ELO tokens to send
      issuer: cold_wallet_address // Issuer of the token
    },
    Destination: recipient_wallet_address,
    DestinationTag: 1 // Optional: Add a tag if the recipient requires it
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
    console.log("Sign this transaction using Xumm:")
    console.log(response.data.next.always)
  } catch (error) {
    console.error("Error creating transaction payload:", error.response?.data || error.message)
  }
}

distributeTokens()

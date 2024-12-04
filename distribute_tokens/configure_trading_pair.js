const axios = require('axios')

async function createTradingPair() {
  const hot_wallet_address = "rsk92foj5ALuzrdtXTYKqSCVTkPFRQShAs" // Replace with your hot wallet address
  const transaction = {
    TransactionType: "OfferCreate",
    Account: hot_wallet_address,
    TakerPays: "300000", // 10 XRP (in drops)
    TakerGets: {
      currency: "ELO",
      issuer: "rhT9ZGLJ3sEkCADKQi7odti4E1SA2RQBit", // Replace with your cold wallet address
      value: "3" // 100 ELO
    }
  }

  try {
    const response = await axios.post(
      "https://xumm.app/api/v1/platform/payload",
      { txjson: transaction },
      {
        headers: {
          "x-api-key": "3368dcb4-7002-42de-b5d7-2aacc937ee6a",
          "x-api-secret": "8848f02b-4a55-4a8f-a51c-23205596f024",
          "Content-Type": "application/json"
        }
      }
    )

    console.log("Transaction payload sent to Xumm!")
    console.log("Sign this transaction using Xumm:")
    console.log(response.data.next.always)
  } catch (error) {
    console.error("Error creating trading pair:", error.response?.data || error.message)
  }
}

createTradingPair()
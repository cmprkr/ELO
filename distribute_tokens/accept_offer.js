const axios = require('axios')

async function acceptOffer() {
  const buyer_wallet_address = "rwosTMHtC6TgsvXoz4gUJJqfZE2fBXhFRC" // Replace with the wallet accepting the offer
  const offer_id = "92535344" // Replace with the Offer ID you want to accept

  const transaction = {
    TransactionType: "OfferCreate",
    Account: buyer_wallet_address,
    OfferSequence: offer_id, // Use the sequence of the offer to accept it
    TakerPays: "300000", // Amount in drops of XRP (10 XRP = 10000000 drops)
    TakerGets: {
      currency: "ELO",
      issuer: "rhT9ZGLJ3sEkCADKQi7odti4E1SA2RQBit", // Replace with the cold wallet address issuing ELO
      value: "3" // Amount of ELO to buy
    }
  }

  try {
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
    console.log("Sign this transaction in Xumm to accept the offer:")
    console.log(response.data.next.always)
  } catch (error) {
    console.error("Error accepting the offer:", error.response?.data || error.message)
  }
}

acceptOffer()

const {
  DollStore
} = require("../Models/dollStore.js");

//get all dolls
const getAllDolls = async (req, res, next)=> {
  try {
    /* code */
    const dolls = await DollStore.find({}).toArray()
    res.status(200).json(dolls)
  } catch (e) {
    console.log(e)
    res.status(500).json( {
      error: e.message
    })
  }
}

const addDoll = async (req, res)=> {
  {
    picture,
    name,
    price,
    category,
    subcategory,
    rating,
    sellerName,
    sellerEmail,
    quantity,
    details
  } = req.body;
  try {
    /* code */
    const doll = await DollStore.insertOne( {
      picture,
      name,
      price,
      category,
      subcategory,
      rating,
      sellerName,
      sellerEmail,
      quantity,
      details
    })

    res.status(201).json(doll)
  } catch (e) {
    console.log(e)
    res.status(500).json( {
      error: e.message
    })
  }
}

module.exports = {
  getAllDolls
}
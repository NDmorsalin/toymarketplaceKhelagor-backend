const { ObjectId } = require("mongodb");
const {
  DollStore
} = require("../Models/dollStore.js");

//get all dolls
const getAllDolls = async (req, res, next)=> {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 0;
  const skip = (page - 1) * limit;
  console.log(page, limit);
  try {
    /* code */
    const totalDolls =  await DollStore.countDocuments()
    const dolls = await DollStore.find({}).limit(limit).skip(skip).toArray()
    res.status(200).json({dolls, totalDolls})
  } catch (e) {
    console.log(e)
    res.status(500).json( {
      error: e.message
    })
  }
}

// get doll by id
const getDollById = async (req, res)=> {
  const id = req.params.id;
  try {
    const query = {
      _id:new ObjectId(id)
    }
    const doll = await DollStore.findOne( query)
    res.status(200).json(doll)

  } catch (e) {
    console.log(e)
    res.status(500).json( {
      error: e.message
    })
  }
}

// add doll
const addDoll = async (req, res)=> {
  const {
    picture,
    name,
    price,
    category,
    subcategory,
    rating,
    seller,
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
      seller,
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
  getAllDolls,
  getDollById
}
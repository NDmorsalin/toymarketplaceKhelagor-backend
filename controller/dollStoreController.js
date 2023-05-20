const { ObjectId } = require("mongodb");
const {
  DollStore
} = require("../Models/dollStore.js");

//get all dolls
const getAllDolls = async (req, res, next) => {
  let query = {};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 0;
  const nameRegex = new RegExp(req.query.search, 'i');

  const skip = (page - 1) * limit;
  if (nameRegex) {
    query = {
      name: nameRegex
    }
  }


  try {

    const totalDolls = await DollStore.countDocuments()
    const dolls = await DollStore.find(query).limit(limit).skip(skip).toArray()
    // console.log({ dolls });
    res.status(200).json({ dolls, totalDolls })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      error: e.message
    })
  }
}

// get doll by id
const getDollById = async (req, res) => {
  const id = req.params.id;
  try {
    const query = {
      _id: new ObjectId(id)
    }
    const doll = await DollStore.findOne(query)
    res.status(200).json(doll)

  } catch (e) {
    console.log(e)
    res.status(500).json({
      error: e.message
    })
  }
}

// add doll
const addDoll = async (req, res) => {
  const dollData = req.body;
  console.log(dollData);
  try {
    /* code */
    const doll = await DollStore.insertOne(dollData)

    res.status(201).json(doll)
  } catch (e) {
    console.log(e)
    res.status(500).json({
      error: e.message
    })
  }
}


module.exports = {
  getAllDolls,
  getDollById, addDoll,
}
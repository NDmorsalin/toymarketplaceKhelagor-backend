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
    // console.log({ search:req.query.search });
    res.status(200).json({ dolls, totalDolls: req.query.search ? dolls.length : totalDolls })
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
  // console.log(dollData);
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

// getMyDoll
const getMyDoll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 0;
  const skip = (page - 1) * limit;
  const email = req.query.email;
  // console.log({ email, limit });
  try {
    const totalDolls = await DollStore.countDocuments()
    const dolls = await DollStore.find({ 'seller.sellerEmail': email }).limit(limit).skip(skip).toArray()
    res.status(200).json({ dolls, totalDolls: email ? dolls.length : totalDolls })
  } catch (e) {
    console.log(e)
    res.status(500).json({
      error: e.message
    })
  }
}

// update doll
const updateDoll = async (req, res) => {
  const id = req.params.id;
  const dollData = req.body;
  try {
    const query = {
      _id: new ObjectId(id)
    }

    const updatedDoll = await DollStore.findOneAndUpdate(query, {
      $set: dollData
    }, {
      returnOriginal: false
    })
    res.status(200).json(updatedDoll)


  } catch (e) {
    console.log(e)
    res.status(500).json({
      error: e.message
    })
  }
}
// delete doll
const deleteDoll = async (req, res) => {
  const id = req.params.id;
  try {
    const query = {
      _id: new ObjectId(id)
    }
    const deletedDoll = await DollStore.findOneAndDelete(query)
    res.status(200).json(deletedDoll)

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
  getMyDoll,
  updateDoll,
  deleteDoll
}
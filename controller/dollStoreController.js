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

module.exports = {getAllDolls}
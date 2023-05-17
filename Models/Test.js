
// ! Delete it later
const {  database } = require("../db/db");
/* 
const testDbCollection = async () => {
    const testCollection = database.collection("testCollection");
    const testDocument = {
        name: "test",
        age: 20,
    };
    const result = await testCollection.insertOne(testDocument);
    console.log(result);

}
 */
module.exports = {
    TestDb:database.collection("testDb")
}
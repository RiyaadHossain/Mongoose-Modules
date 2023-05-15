/* ============================== Module 7: Expolore Mongoose More Queries ============================== */

/* ----------- $type ----------- 
    db.practice.find({ age: { $type: "int" } })
*/

/* ----------- $size ----------- 
    db.practice.find({ skills: { $size: 0 } })
*/

/* ----------- $all ----------- 
    db.practice.find({ skills: { $all: ["JavaScript", "GO"] } }) --> Find in array irrespective of position and element
*/

/* ----------- $elemMatch ----------- 
    db.practice.find({ skills: { $elemMatch: { name: "JAVASCRIPT", level: "Expert" } } }) --> Find in array of object even if object doesn't match exactly
*/

/* ----------- $addToSet ----------- 
    db.practice.find({ interests: { $addToSet: "Gardening" } } }) --> To add element in an array | Don't replace the previous one | Don't add Duplicates
    db.practice.find({ interests: { $addToSet: { $each: ["Gardening", "Sports"] } } } }) --> For adding multiple elements
*/

/* ----------- $pop ----------- 
    db.practice.find({ interests: { $pop: 1 } } }) --> To remove the last element of an Array
*/

/* ----------- $pull ----------- 
    db.practice.find({ interests: { $pull: "Gaming" } } }) --> To remove a specific element
*/

/* ----------- $pullAll ----------- 
    db.practice.find({ interests: { $pullAll: ["Gaming", "Gardening"] } } }) --> To remove multiple specific elements
*/

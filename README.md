# Mongoose-Modules

## MongoDB Operators

### $type

```js
db.practice.find({ age: { $type: "int" } });
```

### $size

```js
db.practice.find({ skills: { $size: 0 } });
```

### $all

```js
// Find in array irrespective of position and element
db.practice.find({ skills: { $all: ["JavaScript", "GO"] } });
```

### $elemMatch

```js
// Find in array of object even if object doesn't match exactly
db.practice.find({
  skills: { $elemMatch: { name: "JAVASCRIPT", level: "Expert" } },
});
```

### $addToSet

```js
// To add element in an array | Don't replace the previous one | Don't add Duplicates
db.practice.updateMany({ }, { interests: { $addToSet: "Gardening" } } })
// For adding multiple elements
db.practice.updateMany({ }, { interests: { $addToSet: { $each: ["Gardening", "Sports"] } } } })
```

### $pop

```js
db.practice.updateMany({ }, { interests: { $pop: 1 } } }) // To remove the last element of an Array
```

### $pull

```js
db.practice.updateMany({ }, { interests: { $pull: "Gaming" } } }) // To remove a specific element
```

### $pullAll

```js
db.practice.updateMany({ }, { interests: { $pullAll: ["Gaming", "Gardening"] } } }) // To remove multiple specific elements
```

### $rename

```js
db.practice.updateMany({}, { $rename: { nmae: "name" } }); // To rename a field name
```

### $unset

```js
db.practice.updateMany({}, { $unset: { name: "" } }); // To remove a field
```

---

---

## Aggregation Framework

**Example 1:**

```js
db.practice.aggregate([
    // Stage 1: Match Document
    { $match: { gender: 'Female', age: { $gte: 18 } } },

    // Stage 2: Add new collection with new field
    {
        $addFields: {
            salary: {
                $toInt: { $floor: { $multiply: [{ $rand: {} }, 100000] } }
            }
        }
    },

    // Stage 3: Reshape Data
    { $project: { name: 1, phone: 1, email: 1, occupation: 1, salary: 1, company: 1, address: 1 } },

    // Stage 4: Create a new collection
    { $out: "user-with-salary" }

    // State 5: Update Document (Note: Alternative of stage 4)
    {$merge: "practice" }
])
```

**Example 2:**

```js
db.practice.aggregate([
  { $group: { _id: "$occupation" } }, // Create _id with distinct value
]);
```

**Example 3:**

```js
db.practice.aggregate([
  {
    $group: {
      _id: null,
      totalSalary: { $sum: "$salary" },
      maxSalary: { $max: "$salary" },
      minSalary: { $min: "$salary" },
      averageSalary: { $avg: "$salary" },
    },
  },
  {
    $project: {
      totalSalary: 1,
      maxSalary: 1,
      minSalary: 1,
      averageSalary: { $toInt: { $round: ["$averageSalary"] } },
    },
  },
]);
```

_Note:_ the `$group` stage is primarily used for grouping documents and performing aggregate calculations, while the `$project` stage is used for reshaping documents and selecting or creating fields.

**Example 4:**

```js
db.practice.aggregate([
  { $unwind: "$friends" }, // For each friend it'll create another document and rest of the properties will be same
  { $group: { _id: "$friends", count: { $sum: 1 } } },
]);
```

**Example 5:** Multiple pipelines with $facet | $facet is used for sub-pipeline

```js
db.practice.aggregate([
  { $match: { _id: ObjectId("6406ad65fc13ae5a400000c7") } },
  {
    $facet: {
      skillsCount: [{ $project: { count: { $size: "$skills" } } }],
      friendsCount: [{ $project: { count: { $size: "$friends" } } }],
    },
  },
]);
```

**Example 5:**

```js
db.practice.aggregate([
  { $match: { gender: "Female", age: { $gte: 18 } } },
  { $lookup: { from: "ShopCollections", localField: "shop", foreignField: "product", as: "shop" } },
]);
```

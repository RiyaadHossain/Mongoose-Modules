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
  {
    $lookup: {
      from: "ShopCollections",
      localField: "shop",
      foreignField: "product",
      as: "shop",
    },
  },
]);
```

---

# Practice Session:

Dummy Data Structure

```
[
  {
     "name": "John Doe",
     "email": "johndoe@example.com",
     "age": 28,
     "address": {
       "street": "123 Main St",
       "city": "New York",
       "state": "NY",
       "zipcode": "10001"
     },
     "favorites": {
       "color": "blue",
       "food": "pizza",
       "movie": "The Shawshank Redemption"
     },
     "friends": [
       {
         "name": "Jane Smith",
         "email": "janesmith@example.com"
       },
       {
         "name": "Mike Johnson",
         "email": "mikejohnson@example.com"
       }
     ]
  }
]
```

## Query Practice

Task 1: Find all users who are located in New York.

```js
db.users.find({ "address.city": "New York" });
```

Task 2: Find the user(s) with the email "johndoe@example.com" and retrieve their favorite movie.

```js
db.users.find({ email: "davidmiller@example.com" }, { "favorites.movie": 1 });
```

Task 3: Find all users with "pizza" as their favorite food and sort them according to age.

```js
db.users.find({ "favorites.food": "pizza" }).sort("age");
```

Task 4: Find all users over 30 whose favorite color is "green".

```js
db.users.find({ age: { $gt: 30 }, "favorites.color": "green" });
```

Task 5: Count the number of users whose favorite movie is "The Shawshank Redemption."

```js
db.users.find({ "favorites.movie": "The Shawshank Redemption" }).count();
```

Task 6: Update the zipcode of the user with the email "jenniferharris@example.com" to "10002".

```js
db.users.updateOne(
  { email: "jenniferharris@example.com" },
  { $set: { "address.zipcode": "10002" } }
);
```

Task 7: Delete the user with the email "alicewilliams@example.com" from the user data.

```js
db.users.deleteOne({ email: "alicewilliams@example.com" });
```

Task 8: Group users by their favorite movie and retrieve the average age in each movie group.

```js
db.users.aggregate([
  {
    $group: { _id: "$favorites.movie", avgAge: { $avg: "$age" } },
  },
]);
```

Task 9: Calculate the average age of users with the favorite " pizza " food.

```js
db.users.aggregate([
  {
    $match: { "favorites.food": "pizza" },
  },
  {
    $group: { _id: "$favorites.food", avgAge: { $avg: "$age" } },
  },
]);
```

## More Practice on Aggregation

Task 1: Group users by their favorite color and retrieve the count of users in each color group.

```js
db.users.aggregate([
  {
    $group: { _id: "$favorites.color", totalUser: { $sum: 1 } },
  },
]);
```

Task 2: Find the user(s) with the highest age.

```js
db.users.find({}).sort({ age: -1 }).limit(3);
```

Task 3: Find the most common favorite food among all users.

```js
db.users.aggregate([
  {
    $group: { _id: "$favorites.food", usersLiked: { $sum: 1 } },
  },
  {
    $sort: { usersLiked: -1 },
  },
  {
    $limit: 1,
  },
  {
    $project: { mostLikedFood: "$_id", _id: 0 },
  },
]);
```

Task 4: Calculate the total number of friends across all users.

```js
db.users.aggregate([
  {
    $group: {
      _id: null,
      totalFriends: { $sum: { $size: "$friends" } },
    },
  },
]);
```

Task 5: Find the user(s) with the longest name.

```js
db.users.aggregate([
  {
    $project: {
      name: 1,
      age: 1,
      address: 1,
      nameLen: { $strLenCP: "$name" },
    },
  },
  {
    $sort: { nameLen: -1 },
  },
  {
    $limit: 3,
  },
]);
```

Task 6: Calculate each state's total number of users in the address field.

```js
db.users.aggregate([
  { $group: { _id: "$address.state", totalUsers: { $sum: 1 } } },
]);
```

Task 7: Find the user(s) with the highest number of friends.

```js
db.users.aggregate([
  {
    $project: {
      name: 1,
      email: 1,
      totalFriends: { $size: "$friends" },
    },
  },
  {
    $sort: { totalFriends: -1 },
  },
  {
    $limit: 1,
  },
]);
```

These tasks involve using various aggregation operators such as $group, $avg, $max, $sum, and $project to perform complex calculations and data transformations. You can write MongoDB aggregation queries to accomplish each task based on user data. Adjust the queries according to your specific implementation and requirements.

Task 10: Perform a lookup aggregation to retrieve the orders data along with the customer details for each order.

```js

```

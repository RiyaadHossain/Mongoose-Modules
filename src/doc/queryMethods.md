# Module 7: Expolore Mongoose More Queries

### $type 
    ```mongodb
    db.practice.find({ age: { $type: "int" } })
    ```

### $size 
    ```mongodb
    db.practice.find({ skills: { $size: 0 } })
    ```

### $all 
    ```mongodb
    db.practice.find({ skills: { $all: ["JavaScript", "GO"] } }) --> Find in array irrespective of position and element
    ```

### $elemMatch 
    ```mongodb
    db.practice.find({ skills: { $elemMatch: { name: "JAVASCRIPT", level: "Expert" } } }) --> Find in array of object even if object doesn't match exactly
    ```

### $addToSet 
    ```mongodb
    db.practice.updateMany({ }, { interests: { $addToSet: "Gardening" } } }) --> To add element in an array | Don't replace the previous one | Don't add Duplicates
    db.practice.updateMany({ }, { interests: { $addToSet: { $each: ["Gardening", "Sports"] } } } }) --> For adding multiple elements
    ```

### $pop 
    ```mongodb
    db.practice.updateMany({ }, { interests: { $pop: 1 } } }) --> To remove the last element of an Array
    ```

### $pull 
    ```mongodb
    db.practice.updateMany({ }, { interests: { $pull: "Gaming" } } }) --> To remove a specific element
    ```

### $pullAll 
    ```mongodb
    db.practice.updateMany({ }, { interests: { $pullAll: ["Gaming", "Gardening"] } } }) --> To remove multiple specific elements
    ```

### $rename 
    ```mongodb
    db.practice.updateMany({ }, { $rename: { "nmae": "name" } }) --> To rename a field name
    ```

### $unset 
    ```mongodb
    db.practice.updateMany({ }, { $unset: { name: "" } }) --> To remove a field
    ```

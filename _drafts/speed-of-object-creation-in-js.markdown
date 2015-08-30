---
layout: post
title: Speed of (object) creation in JS
---

How would you parse an array of values into objects?

If you have a fixed number of fields in the object, then you can do this:

```javascript
var objs = nestedArray.map(function (row) {
    return {
      'Name'   : row[0],
      'Age'    : row[1],
      'Address': row[2]
    };
});
```

and if you do not know the  in advance, then 

```javascript
var headers = ['Name', 'Age', 'Address'];
var objs = nestedArray.map(function (row) {
   var m = headers.length, j = -1, o = {};
   while(++j < m) o[header[j]] = row[j];
   return o;
});
```

Why would you send back an array instead of sending back fields themselves?

  - You may be fetching a `csv` file
  - Optimising the data being downloaded
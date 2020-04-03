var json = require('../source/recipes.json')

res = []
for (var i=0; i<=500; i++) {
    res.push(json[i])
}
console.log(res[0])

// Database
const db = require('../config/database.js')
const Recipe = require('../models/Recipe')

// Test DB
db.authenticate()
    .then(() => console.log('Database conncected...'))
    .catch(() => console.log("Error: " + err))

// async function save(data) {
//     await Recipe.create({data})
// }

// (async () => {
//     await Recipe.create({ 
//         recipe_id: 0,
//         title: res[0]['title'],
//         rating: res[0]['rating'],
//         fat: res[0]['fat'],
//         calories: res[0]['calories'],
//         protein: res[0]['protein'],
//         sodium: res[0]['sodium']
//     })
// })();

for (var i in res) {
    try {
        Recipe.create({ 
            title: res[i]['title'],
            rating: res[i]['rating'],
            fat: res[i]['fat'],
            calories: res[i]['calories'],
            protein: res[i]['protein'],
            sodium: res[i]['sodium'],
            description: res[i]['desc'],
            ingredients: res[i]['ingredients'],
            steps: res[i]['directions'],
            categories: res[i]['categories']
        })
            .then();
    }
    catch (err) {
        console.log("Error: " + err)
    }
}

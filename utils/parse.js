var json = require('../source/recipes.json')

res = []
for (var i=0; i<=500; i++) {
    res.push(json[i])
}
console.log(res[0])

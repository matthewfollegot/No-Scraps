# No-Scraps

### to setup the project I ran:

`npm init`
`npm install --save express body-parser morgan` installs epxress and some deps
`npm i -D nodemon` nodemon for magic :)
`npm install -D sequelize-cli` sequelize-cli - ORM that interfaces with MySQL
`npm install --save sequelize` installing sequelize
`npm install --save mysql2`

`sequelize init` initializes sequelize and creates migrations, config, etc

`npx sequelize init` avoids us having to download packages globally - works because sequelize is a dep in package.json


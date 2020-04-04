# No-Scraps

App to help you search for your favourite recipes based on ingredients you have left over plus any health restrictions/allergies and filter by the difficulty of the recipe as well!

## Project Setup


#### Clone and install dependencies

```
git clone git@github.com:matthewfollegot/No-Scraps.git
npm install
```

#### Setup Database
```
brew install postgresql
createdb <dbname>
<dbname> < config/db.sql
brew services start postgresql
```

#### Populate Database
```
node utils/bulk_insert.js
```
to add > 500 recipes to the db, you can alter the script to add up to 20,000 recipes!

#### Launch the app
```
npm start
``` 
will launch the app on `localhost:5000`

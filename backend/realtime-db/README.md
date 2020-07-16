# realtime-db

## Usage

``` js
const setupDatabase = require('realtime-db')

setupDabase(config).then(db => {
  const { Fridge, Temperature } = db

}).catch(err => console.error(err))
```

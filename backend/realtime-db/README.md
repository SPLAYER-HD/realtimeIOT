# realtime-db

## Usage

``` js
const setupDatabase = require('realtime-db')

setupDabase(config).then(db => {
  const { Refrigerator, Temperature } = db

}).catch(err => console.error(err))
```

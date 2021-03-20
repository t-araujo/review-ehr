const { app } = require('src/app')

before(async function () {
  global.app = app.listen()
})

after(async () => {
  await global.app.close()
})

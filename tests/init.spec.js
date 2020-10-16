//init.spec.js
const mongoUnit = require('mongo-unit');

mongoUnit.start().then(() => {
  console.log('fake mongo is started: ', mongoUnit.getUrl());
  run(); // this line start mocha tests
});
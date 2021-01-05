import seeder from 'mongoose-seed';

seeder.connect('mongodb://localhost/database', function () {
  // Load Mongoose models
  seeder.loadModels(['src/modules/plan/PlanModel.ts', 'src/modules/price/PriceModel.ts']);

  // Clear specified collections
  seeder.clearModels(['Plan', 'Price'], function () {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function (err, done) {
      if (err) {
        return console.log('err', err);
      }
      if (done) {
        return console.log('done', done);
      }
      seeder.disconnect();
    });
  });
});

const data = [
  {
    model: 'Plan',
    documents: [
      { name: 'FaleMais 30', minutes: 30 },
      { name: 'FaleMais 60', minutes: 60 },
      { name: 'FaleMais 120', minutes: 120 },
    ],
  },
  {
    model: 'Price',
    documents: [
      { origin: '011', destiny: '016', pricePerMinute: 1.9 },
      { origin: '016', destiny: '011', pricePerMinute: 2.9 },
      { origin: '011', destiny: '017', pricePerMinute: 1.7 },
      { origin: '017', destiny: '011', pricePerMinute: 2.7 },
      { origin: '011', destiny: '018', pricePerMinute: 0.9 },
      { origin: '018', destiny: '011', pricePerMinute: 1.9 },
    ],  
  },
];

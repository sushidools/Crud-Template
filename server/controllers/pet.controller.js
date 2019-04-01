const Restaurant = require('mongoose').model('Restaurant');
const { Http } = require('@status/codes');

module.exports = {
  index(req, res) {
    console.log('We got the index');
    Restaurant.find({})
      .then(restaurants => res.json({ restaurants: restaurants }))
      .catch(error => res.json(error));
  },
  show(req, res) {
    console.log('Getting one restaurant');
    Restaurant.findById(req.params.id)
      .then(data => res.json({ restaurant: data }))
      .catch(error => res.json(error));
  },
  create(req, res) {
    var restaurant = new Restaurant({
      name: req.body.name,
      cuisine: req.body.cuisine,
      reviews: [],
    });
    console.log(req.body);
    restaurant
      .save()
      .then(restaurant => {
        res.json(restaurant);
      })
      .catch(error => {
        console.log('Controller error: ' + error.code);
        if (error.code == 11000) {
          const errors = 'The restaurant name cannot match another restaurant!';
          res.status(Http.UnprocessableEntity).json(errors);
        } else {
          console.log('There was an error!');
          const errors = Object.keys(error.errors).map(
            key => error.errors[key].message
          );
          res.status(Http.UnprocessableEntity).json(errors);
        }
      });
  },
  update(req, res) {
    Restaurant.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      upsert: true,
      new: true,
    })
      .then(restaurant => {
        res.json(restaurant);
      })
      .catch(error => {
        console.log('Controller error: ' + error.code);
        if (error.code == 11000) {
          const errors = 'The restaurant name cannot match another restaurant!';
          res.status(Http.UnprocessableEntity).json(errors);
        } else {
          console.log('There was an error!');
          const errors = Object.keys(error.errors).map(
            key => error.errors[key].message
          );
          res.status(Http.UnprocessableEntity).json(errors);
        }
      });
  },
  updateReviews(req, res) {
    randId = Math.floor(Math.random() * 1000);
    Restaurant.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          reviews: {
            _id: randId,
            name: req.body.name,
            star: req.body.start,
            content: req.body.content,
          },
        },
      },
      { runValidators: true }
    )
      .then(restaurant => res.json(restaurant))
      .catch(error => {
        const errors = Object.keys(error.errors).map(
          key => error.errors[key].message
        );
        res.status(Http.UnprocessableEntity).json(errors);
      });
  },
  destroy(req, res) {
    Restaurant.findByIdAndRemove(req.params.id)
      .then(restaurant => res.json(restaurant))
      .catch(error => res.json(error));
  },
};

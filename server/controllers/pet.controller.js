const Pet = require('mongoose').model('Pet');
const { Http } = require('@status/codes');

module.exports = {
  index(req, res) {
    console.log('We got the index');
    Pet.find({})
      .sort({ petType: 1 })
      .then(pets => res.json({ pets: pets }))
      .catch(error => res.json(error));
  },
  show(req, res) {
    console.log('Getting one pet');
    Pet.findById(req.params.id)
      .then(data => res.json({ pet: data }))
      .catch(error => res.json(error));
  },
  create(req, res) {
    Pet.create(req.body)
      .then(pet => {
        res.json(pet);
      })
      .catch(error => {
        console.log('Controller error: ' + error.code);
        if (error.code == 11000) {
          const errors = 'The pet name cannot match a pet within the shelter!';
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
    Pet.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      upsert: true,
      new: true,
    })
      .then(pet => {
        res.json(pet);
      })
      .catch(error => {
        console.log('Controller error: ' + error.code);
        if (error.code == 11000) {
          const errors = 'The pet name cannot match a pet within the shelter!';
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
  updateLikes(req, res) {
    Pet.findByIdAndUpdate(
      req.params.id,
      {
        $set: { likes: req.body.likes },
      },
      { upsert: true }
    )
      .then(pet => res.json(pet))
      .catch(error => {
        const errors = Object.keys(error.errors).map(
          key => error.errors[key].message
        );
        res.status(Http.UnprocessableEntity).json(errors);
      });
  },
  destroy(req, res) {
    Pet.findByIdAndRemove(req.params.id)
      .then(pet => res.json(pet))
      .catch(error => res.json(error));
  },
};

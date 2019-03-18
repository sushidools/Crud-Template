const Pet = require('mongoose').model('Pet');
const { Http } = require('@status/codes');

module.exports = {
  index(req, res) {
    console.log('We got the index');
    Pet.find({}).sort( { petType: 1 } )
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
      .then((pet) => { res.json(pet) })
      .catch(error => {
        const errors = Object.keys(error.errors).map(
          key => error.errors[key].message
        );
        res.status(Http.UnprocessableEntity).json(errors);
      });
  },
  update(req, res) {
    Pet.findByIdAndUpdate(req.params.id, {
      $set: {
        petName: req.body.petName,
        petType: req.body.petType,
        description: req.body.description,
        skill1: req.body.skill1,
        skill2: req.body.skill2,
        skill3: req.body.skill3,
        likes: req.body.likes
    }}, { upsert: true })
      .then(pet => { res.json(pet) })
      .catch(error => {
        const errors = Object.keys(error.errors).map(
          key => error.errors[key].message
        );
        res.status(Http.UnprocessableEntity).json(errors);
      });
  },
  updateLikes(req, res) {
    Pet.findByIdAndUpdate( req.params.id ,
      {
        $set: { likes : req.body.likes }
      },
      { upsert: true })
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
  }
};
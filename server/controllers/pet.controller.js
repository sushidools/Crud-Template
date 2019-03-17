const Pet = require('mongoose').model('Pet');
const { Http } = require('@status/codes');

module.exports = {
  index(req, res) {
    console.log('We got the index');
    Pet.find({})
      .then(pets => res.json({ pets: pets }))
      .catch(error => res.json(error));
  },
  show(req, res) {
    console.log('Getting one pet');
    Pet.findById(req.params.id)
      .then(data => res.json({ pet: data }))
      .catch(error => res.json('pet with that id could not be found'));
  },
  create(req, res) {
    Pet.create(req.body)
      .then(pet => res.json(pet))
      .catch(error => res.json(error));
  },
  update(req, res) {
    Pet.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set:
        {
          petName: req.body.petName,
          petType: req.body.petType,
          description: req.body.description,
          skills: {
            content: req.body.content,
          }
        }
      },
      {
        runValidators: true,
      }
    )
      .then(pet => res.json(pet))
      .catch(error => res.json(error));
  },
  updateLikes(req, res) {
    Pet.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: { '$.likes': req.body.likes }
      },
      {
        runValidators: true,
        context: 'query',
      }
    )
      .then(pet => res.json(pet))
      .catch(error => res.json(error));
  },
  destroy(req, res) {
    Pet.findByIdAndRemove(req.params)
      .then(pet => res.json(pet))
      .catch(error => res.json(error));
  }
};
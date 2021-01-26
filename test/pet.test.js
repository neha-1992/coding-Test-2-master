const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('functional - pet', () => {
    // name required
  it('should fail to create a pet without a name', async () => {
    const res = await request(app).post('/pets').send({
      age: 16,
      colour: 'brown',
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
  });

  // age required
    it('should fail to create a pet without a age', async () => {
    const res = await request(app).post('/pets').send({
      name: 'johny',
      colour: 'brown',
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"age" is required');
  });

  //colour required
    it('should fail to create a pet without a colour', async () => {
    const res = await request(app).post('/pets').send({
     name: 'johny',
      age: 16,
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"colour" is required');
  });

  // save pets
  it('should create a pet', async () => {
    const pet = {
     name: 'johny',
      age: 16,
      colour: 'brown',
    };
    const res = await request(app).post('/pets').send(pet);
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(pet.name);
    expect(res.body.age).to.equal(pet.age);
    expect(res.body.colour).to.equal(pet.colour);
  });

  // get pets
    it('should get pets list', async () => {
    const res = await request(app).get('/pets');
    expect(res.status).to.equal(201);
  });

  //Delete: check pet not exist
    // get pets
    it('should not pet exist', async () => {
    const res = await request(app).delete('/pets/12345');
    expect(res.status).to.equal(404);
    expect(res.body.error).to.equal("Pet doesn't exist!");
  });

  // pet deleted
    it('should pet deleted', async () => {
    const pet = {
     name: 'browny',
      age: 16,
      colour: 'brown',
    };
    const petObj = await request(app).post('/pets').send(pet);
    let deleteUrl = '/pets/'+petObj.body._id;
    console.log(deleteUrl);
    const res = await request(app).delete(deleteUrl);
    expect(res.status).to.equal(204);
  });
});
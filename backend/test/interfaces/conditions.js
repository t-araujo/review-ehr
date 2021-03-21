describe('Conditions interface', () => {
  describe('GET /conditions', () => {
    it('Should get all conditions', async () => {
      const response = await chai.request(app)
        .get('/api/conditions')

      response.should.have.status(200)
      response.body.should.be.a('array')
    })
  })
})

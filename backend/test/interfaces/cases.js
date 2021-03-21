describe('Cases interface', () => {
  describe('GET /cases', () => {
    it('Should get all cases', async () => {
      const response = await chai.request(app)
        .get('/api/cases')

      response.should.have.status(200)
      response.body.should.be.a('array')
    })
  })
})

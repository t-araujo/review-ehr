describe('Conditions interface', () => {
  describe('GET /conditions', () => {
    it('Should get all conditions', async function () {
      const response = await chai.request(app)
        .get('/api/conditions')
        .set({ Authorization: `Bearer ${this.authenticatedUser().token}` })

      response.should.have.status(200)
      response.body.should.be.a('array')
    })
  })
})

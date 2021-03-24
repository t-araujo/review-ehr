describe('Cases interface', () => {
  describe('GET /cases', () => {
    it('Should get all cases', async function () {
      const response = await chai.request(app)
        .get('/api/cases')
        .set({ Authorization: `Bearer ${this.authenticatedUser().token}` })

      response.should.have.status(200)
      response.body.should.be.a('array')
    })
  })
})

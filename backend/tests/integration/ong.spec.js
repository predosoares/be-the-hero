const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
  beforeEach( async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterAll( async () => {
    await connection.destroy()
  } )

  it('shuold be able to create a new ONG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "PHAS",
        email: "contato@phas.com.br",
        whatsapp: "21900000333",
        city: "Rio de Janeiro",
        uf: "RJ"
      })

    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  })
})
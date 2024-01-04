import chai from 'chai'
import supertest from 'supertest'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing Adoptme', () => {
    describe('Test de Mascotas', () => {
        it('El endpoint POST /api/pets debe registrar una mascota', async () => {
            const petMock = {
                name: 'Firulais',
                specie: 'dog',
                birthDate: '10-10-2020'
            }

            const response = await requester.post('/api/pets').send(petMock)
            const { status, ok, _body } = response
            // console.log(status)

            // expect(status).to.be.equals(200)
            expect(_body.payload).to.have.property('_id')

        })
    })
})
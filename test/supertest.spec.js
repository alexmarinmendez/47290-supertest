import chai from 'chai'
import supertest from 'supertest'
import { faker } from '@faker-js/faker'

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing Adoptme', () => {
    describe('Test /api/pets', () => {
        it('El endpoint POST /api/pets debe registrar una mascota', async () => {
            const petMock = {
                name: 'Firulais',
                specie: 'dog',
                birthDate: '10-10-2020'
            }

            const response = await requester.post('/api/pets').send(petMock)
            const { status, ok, _body } = response
            expect(_body.payload).to.have.property('_id')

        })
        it('El endpoint POST /api/pets no debe registrar una mascota con datos vacíos', async () => {
            const petMock = {}

            const response = await requester.post('/api/pets').send(petMock)
            const { status, ok, _body } = response
            expect(ok).to.be.eq(false)

        })
    })

    describe('Registro, Login and Current', () => {
        let cookie
        const mockUser = {
            first_name: 'Maria',
            last_name: 'Lujan',
            email: faker.internet.email(),
            password: 'secret'
        }

        it ('debe registrar un usuario', async() => {
            const {_body} = await requester.post('/api/sessions/register').send(mockUser)

            expect(_body.payload).to.be.ok
        })

        it('Debe loguear un user y devolver una cookie', async () => {
            const result = await requester.post('/api/sessions/login').send({
                email: mockUser.email,
                password: mockUser.password
            })

            const cookieResult = result.headers['set-cookie'][0]
            expect(cookieResult).to.be.ok
        })
    })
})
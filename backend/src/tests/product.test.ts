import './../lib/node_env'
import request from 'supertest'
import server from '../index'
import { prisma } from './../lib/prisma'


let app = request(server)


let product = {
    title: "Water bottle",
    description: "High quality",
}
describe('products operations', () => {
    beforeEach(async () => {
        await prisma.products.deleteMany()
    })
    it('should create a product', async () => {
        let res = await app.post('/api/products').send(product);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('product')

        let created_product = res.body.product

        expect(created_product.title).toBe(product.title)
        expect(created_product.description).toBe(product.description)
    })
})
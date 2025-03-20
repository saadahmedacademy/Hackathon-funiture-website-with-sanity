import { type SchemaTypeDefinition } from 'sanity'
import { Category } from './category'
import { product } from './product'
import { orderTypes } from './orderTypes'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Category, product, orderTypes],
}

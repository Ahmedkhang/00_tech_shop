import { type SchemaTypeDefinition } from 'sanity'
import laptops from './laptop'
import mobiles from './mobile'
import watches from './watches'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [laptops,mobiles,watches],
}

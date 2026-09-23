export const getCustomerByNameSchema = {
  type: 'function',
  function: {
    name: 'getCustomerByName',
    description: 'Recherche un client dans la base de données à partir de son nom.',
    parameters: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Le nom du client à rechercher (ex: "Acme Corp", "Umbrella")',
        },
      },
      required: ['name'],
    },
  },
} as const;

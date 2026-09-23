export const getTopCustomerSchema = {
  type: 'function',
  function: {
    name: 'getTopCustomer',
    description: "Récupère le client ayant généré le plus de chiffre d'affaires total.",
    parameters: {
      type: 'object',
      properties: {},
    },
  },
} as const;

export interface Customer {
  id: string;
  name: string;
  email: string;
  totalSpent: number;
}

const mockCustomers: Customer[] = [
  { id: '1', name: 'Acme Corp', email: 'contact@acme.com', totalSpent: 45000 },
  { id: '2', name: 'Globex', email: 'info@globex.com', totalSpent: 12500 },
  { id: '3', name: 'Initech', email: 'billing@initech.com', totalSpent: 89000 },
  { id: '4', name: 'Umbrella Corp', email: 'admin@umbrella.com', totalSpent: 3400 },
];

export class DbService {
  /**
   * Retourne le client ayant dépensé le plus d'argent.
   */
  async getTopCustomer(): Promise<Customer> {
    // En vrai, ce serait une requête SQL (ex: ORDER BY totalSpent DESC LIMIT 1)
    const sorted = [...mockCustomers].sort((a, b) => b.totalSpent - a.totalSpent);
    return sorted[0];
  }

  /**
   * Recherche un client par son nom.
   */
  async getCustomerByName(name: string): Promise<Customer | undefined> {
    return mockCustomers.find((c) => c.name.toLowerCase().includes(name.toLowerCase()));
  }
}

export const dbService = new DbService();

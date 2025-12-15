import { Customer } from '../types/Customer';
export const buildCustomer = (): Customer => ({
    firstName: 'John',
    lastName: 'Doe',
    zip: '12345'
});
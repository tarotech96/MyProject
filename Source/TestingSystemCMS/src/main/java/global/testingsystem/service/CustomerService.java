/**
 * 
 */
package global.testingsystem.service;

import java.util.List;

import global.testingsystem.entity.Customer;

/**
 * @author USER
 *
 */
public interface CustomerService {

        List<Customer> listCustomers();

        boolean save(Customer customer);

        boolean deleteCustomerById(int id);

        List<Customer> searchCustomer(String key);
        
        List<Customer> sortCustomer(String key);

}

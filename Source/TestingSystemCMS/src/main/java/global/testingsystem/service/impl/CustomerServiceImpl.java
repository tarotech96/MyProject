/**
 * 
 */
package global.testingsystem.service.impl;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import global.testingsystem.entity.Customer;
import global.testingsystem.repository.CustomerRepository;
import global.testingsystem.service.CustomerService;

/**
 * @author USER
 *
 */
@Service
public class CustomerServiceImpl implements CustomerService {
        @Autowired
        private CustomerRepository customerRepo;

        @Override
        public boolean save(Customer customer) {
                // TODO Auto-generated method stub
                customerRepo.save(customer);
                return true;
        }

        @Override
        public List<Customer> listCustomers() {
                // TODO Auto-generated method stub
                return customerRepo.findAll();
        }

        @Override
        public boolean deleteCustomerById(int id) {
                // TODO Auto-generated method stub
                customerRepo.deleteById(id);
                return true;
        }

        @Override
        public List<Customer> searchCustomer(String key) {
                // TODO Auto-generated method stub
                List<Customer> result = new LinkedList<>();
                List<Customer> list = customerRepo.findAll();
                if (key == null && "".equals(key)) {
                        return list;
                } else {
                        for (Customer customer : list) {
                                if (customer.getName().toLowerCase().contains(key.toLowerCase())) {
                                        result.add(customer);
                                }
                        }
                }
                return result;
        }

        @Override
        public List<Customer> sortCustomer(String key) {
                // TODO Auto-generated method stub
                return customerRepo.findAllByOrderByNameAsc();
        }

}

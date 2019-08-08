/**
 * 
 */
package global.testingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import global.testingsystem.entity.Customer;

/**
 * @author USER
 *
 */
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer>{
        List<Customer> findAllByOrderByNameAsc();
}

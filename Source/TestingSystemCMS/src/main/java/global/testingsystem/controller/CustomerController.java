/**
 * 
 */
package global.testingsystem.controller;

import java.util.Date;
import java.util.List;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.SimpleEmail;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import global.testingsystem.entity.Customer;
import global.testingsystem.service.CustomerService;
import global.testingsystem.util.ConstantPage;

/**
 * @author USER
 *
 */
@CrossOrigin(origins = "*")
@RestController
public class CustomerController {

        @Autowired
        private CustomerService customerService;

        @GetMapping(value = ConstantPage.REST_API_GET_ALL_CUSTOMER, produces = {
                        MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public List<Customer> getListCustomer() {
                return customerService.listCustomers();
        }

        @DeleteMapping(value = ConstantPage.REST_API_DELETE_CUSTOMER_BY_ID, produces = {
                        MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public boolean deleteCustomer(@PathVariable int id) {
                return customerService.deleteCustomerById(id);
        }

        @PostMapping(value = ConstantPage.REST_API_INSERT_CUSTOMER, produces = {
                        MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public ResponseEntity<Object> createCustomer(@RequestParam("customer") String customer) {
                JSONObject jsonObject = new JSONObject(customer);
                String name = jsonObject.getString("name");
                String email = jsonObject.getString("email");
                String phone = jsonObject.getString("phone");
                String message = jsonObject.getString("message");
                String subject = jsonObject.getString("subject");
                String content = "";
                Customer customerContact = new Customer();
                customerContact.setName(name);
                customerContact.setEmail(email);
                customerContact.setPhone(phone);
                customerContact.setSubject(subject);
                customerContact.setMessage(message);
                Date date = new Date();
                java.sql.Date sqlDate = new java.sql.Date(date.getTime());
                customerContact.setCreated_at(sqlDate);
    			String title = "Gửi yêu cầu thành công";
    			new Thread(() -> {
    				sendEmail(email, content, title);
    			}).start();
                boolean isSuccess = customerService.save(customerContact);
                return new ResponseEntity<Object>(isSuccess, HttpStatus.OK);
        }

        public boolean sendEmail(String emailDes, String content, String title) {
        	try {
    			Email email = new SimpleEmail();

    			// Cấu hình thông tin Email Server
    			email.setHostName("smtp.googlemail.com");
    			email.setSmtpPort(465);
    			email.setAuthenticator(new DefaultAuthenticator(ConstantPage.MY_EMAIL, ConstantPage.MY_PASSWORD));

    			// Với gmail cái này là bắt buộc.
    			email.setSSLOnConnect(true);

    			// Người gửi
    			email.setFrom(ConstantPage.MY_EMAIL);

    			// Tiêu đề
    			email.setSubject(title);

    			// Update content type
    			email.setCharset("utf-8");
    			email.setContent(content, Email.TEXT_HTML);

    			// Nội dung email
//    			email.setMsg(content);

    			// Người nhận
    			email.addTo(emailDes);
    			email.send();
    			return true;
    		} catch (Exception e) {
    			e.printStackTrace();
    			return false;
    		}
        }

        @GetMapping(value = ConstantPage.REST_API_SEARCH_CUSTOMER, produces = {
                        MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public List<Customer> serachCustomer(@RequestParam String key) {
                return customerService.searchCustomer(key);
        }

        @GetMapping(value = ConstantPage.REST_API_SORT_CUSTOMER_BY_NAME, produces = {
                        MediaType.APPLICATION_PROBLEM_JSON_VALUE })
        public List<Customer> sortCustomer(@RequestParam String key) {
                return customerService.sortCustomer(key);
        }

}

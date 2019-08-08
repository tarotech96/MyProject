/**
 * author: USER
 */
package global.testingsystem.controller;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.SimpleEmail;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import global.testingsystem.util.ConstantPage;

/**
 * Create by: tcnam
 * Create date: Dec 12, 2018
 * Modifier: tcnam
 * Modified date: Dec 12, 2018
 * Description:
 * Version 1.0
 */
@CrossOrigin(origins = "*")
@RestController
public class UserRegisterController {
	
	
	
	public boolean sendEmail(String emailDes,String content)
	{
		 try {            
	           Email email = new SimpleEmail();
	 
	           // Cấu hình thông tin Email Server
	           email.setHostName("smtp.googlemail.com");
	           email.setSmtpPort(465);
	           email.setAuthenticator(new DefaultAuthenticator(ConstantPage.MY_EMAIL,
	                   ConstantPage.MY_PASSWORD));
	            
	           // Với gmail cái này là bắt buộc.
	           email.setSSLOnConnect(true);
	            
	           // Người gửi
	           email.setFrom(ConstantPage.MY_EMAIL);
	            
	           // Tiêu đề
	           email.setSubject("TesingSystem");
	            
	           // Nội dung email
	           email.setMsg("Chúc mừng bạn đã đăng kí thành công! \n"+content);
	            
	           // Người nhận
	           email.addTo(emailDes);            
	           email.send();
	           System.out.println("Sent!!");
	           return true;
	       } catch (Exception e) {
	           e.printStackTrace();
	           return false;
	       }
	}
	


}

/**
 * 
 */
package global.testingsystem.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author USER
 *
 */
@Entity
@Table(name = "customer")
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", columnDefinition = "int", nullable = false)
	private int id;
	@Column(name = "name", columnDefinition = "nvarchar(50)", nullable = false)
	private String name;
	@Column(name = "email", columnDefinition = "nvarchar(50)", nullable = false)
	private String email;
	@Column(name = "message", columnDefinition = "nvarchar(255)", nullable = false)
	private String message;
	@Column(name = "subject", columnDefinition = "nvarchar(50)", nullable = false)
	private String subject;
	@Column(name = "phone", columnDefinition = "varchar(50)", nullable = false)
	private String phone;
	@Column(name = "created_at", columnDefinition = "DateTime")
	private Date created_at;
	public Customer() {
		super();
	}

	public Customer(int id, String name, String email, String message, String subject, String phone, Date created_at) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.message = message;
		this.subject = subject;
		this.phone = phone;
		this.created_at = created_at;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Date getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}
	

}

package global.testingsystem.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.SimpleEmail;
import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import global.testingsystem.entity.CustomError;
import global.testingsystem.entity.Exam_Result;
import global.testingsystem.entity.Role;
import global.testingsystem.entity.Users;
import global.testingsystem.service.ExamResultService;
import global.testingsystem.service.JwtService;
import global.testingsystem.service.RoleService;
import global.testingsystem.service.UploadFileService;
import global.testingsystem.service.UsersService;
import global.testingsystem.util.ConstantPage;

/**
 * @author admin Modify By NVCONG
 */
@CrossOrigin(origins = "*")
@RestController
public class UsersController {
	public UsersController() throws IOException {
		// TODO Auto-generated constructor stub
	}

	@Autowired
	private HttpServletRequest request;
	@Autowired
	private JwtService jwtService;
	@Autowired
	private UsersService usersService;
	@Autowired
	private BCryptPasswordEncoder passEncode;
	@Autowired
	private RoleService roleService;
	@Autowired
	private UploadFileService uploadService;
	@Autowired
	private ServletContext servletContext;
	@Autowired
	private ExamResultService examResultService;
	private Logger log = Logger.getLogger(UsersController.class);

	/* ---------------- GET ALL USER ------------------------ */
	@GetMapping(value = ConstantPage.REST_API_GET_ALL_USERS, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public List<Users> list() {
		List<Users> listUsers = usersService.getListUser();
		System.out.println("listUsers_size : " + listUsers.size());
		return listUsers;
	}

	/* ---------------- DELETE USER hvn ------------------------ */
	@DeleteMapping(value = ConstantPage.REST_API_DELETE_USERS_BY_ID, produces = {
			MediaType.APPLICATION_PROBLEM_JSON_VALUE, })
	public ResponseEntity<Object> delete(@PathVariable int id) {
		Users users = usersService.findById(id);
		users.setStatus(0);
		boolean isSuccess = usersService.edit(users);
		return new ResponseEntity<>(isSuccess, HttpStatus.OK);
	}

	/* ---------------- ADD USER ------------------------ */
	@PostMapping(value = ConstantPage.REST_API_INSERT_USERS, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<Object> insert(@RequestParam("user") String user,
			@RequestParam(required = false) MultipartFile image) {
		JSONObject jsonObject = new JSONObject(user);
		String email = jsonObject.getString("email");
		String fullName = jsonObject.getString("fullname");
		String address = jsonObject.getString("address");
		String password = jsonObject.getString("password");
		String url = ConstantPage.BASE_URL_CLIENT + "/hometotal/login";
		String content = "Tài khoản đã được tạo!<br>" + "Tên đăng nhập: " + email + "<br>Mật khẩu: " + password
				+ "<br>Để đăng nhập vui lòng ấn " + "<a href=" + url + ">vào đây</a> <br>" + "Thân gửi! <br><br>";
//				+ "<img style='width: 15%' src='https://www.cmc.com.vn/sites/default/files/screenshot_1.png' alt='cmc global' title='cmc global'> <br><br>"
//				+ "Địa chỉ: Phố Duy Tân, phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội <br>"
//				+ "Tel: 04. 3 795 8668   |   Fax: 04. 3 795 8989 <br>" + "Website: http://www.cmc.com.vn";
		String encodePass = passEncode.encode(password);
		String phone = jsonObject.getString("phone");
		String birthDay = jsonObject.getString("birthday");
		Users checkUser = usersService.findByEmail(email);
		if (checkUser != null) { 
			throw new CustomError.GeneralError("Tài khoản đã tồn tại");
		}else {
			Users newUser = new Users();
			newUser.setFullname(fullName);
			newUser.setEmail(email);
			newUser.setPassword(encodePass);
			newUser.setBirthday(birthDay);
			newUser.setAddress(address);
			newUser.setPhone(phone);
			newUser.setStatus(1);
			Role defaultRole = roleService.findByName("USER");
			Set<Role> defaultSet = new HashSet<>();
			newUser.setRole(defaultSet);
			newUser.addRole(defaultRole);
			if (image != null) {
				String urlImg = uploadService.saveFileVer(image, ConstantPage.PATH_SAVE_USER_UPLOAD);
				String[] arrImg = urlImg.split("\\.");
				int lengh = arrImg.length;
				if (!arrImg[lengh - 1].toLowerCase().equals("jpg")
						&& !arrImg[lengh - 1].toLowerCase().equals("jpeg")
						&& !arrImg[lengh - 1].toLowerCase().equals("png")
						&& !arrImg[lengh - 1].toLowerCase().equals("tiff")
						&& !arrImg[lengh - 1].toLowerCase().equals("gif")
						&& !arrImg[lengh - 1].toLowerCase().equals("bmp")) {
					throw new CustomError.GeneralError("Ảnh không đúng định dạng");
				} else {
					newUser.setImg(uploadService.saveFileVer(image, ConstantPage.PATH_SAVE_USER_UPLOAD));
				}
			} else
				newUser.setImg("");
			boolean isSuccess = usersService.addUser(newUser);
			String title = "Tài khoản đã được tạo";
			new Thread(() -> {
				sendEmail(email, content, title);
			}).start();
			return new ResponseEntity<>(isSuccess, HttpStatus.OK);
		}
	}

	/* ---------------- UPDATE USER ------------------------ */
	@PostMapping(value = ConstantPage.REST_API_UPDATE_USERS, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<Object> update(@RequestParam("user") String user,
			@RequestParam(required = false) MultipartFile image) {
		// parse JSONstring to JSONobject
		JSONObject jsonObject = new JSONObject(user);
		int id = jsonObject.getInt("id");
		String fullName = jsonObject.getString("fullname");
		String email = jsonObject.getString("email");
		String address = jsonObject.getString("address");
		String phone = jsonObject.getString("phone");
		int status = jsonObject.getInt("status");
		Users usersFinByEmail = usersService.findByEmail(email);
		if (usersFinByEmail != null)
			if (usersFinByEmail.getId() != id && usersFinByEmail.getFullname() != fullName)
				throw new CustomError.GeneralError("Tài khoản đã tồn tại");
		Users users = usersService.findById(id);
		users.setFullname(fullName);
		users.setPhone(phone);
		users.setAddress(address);
		users.setStatus(status);
		if (image != null) {
			String urlImg = uploadService.saveFileVer(image, ConstantPage.PATH_SAVE_USER_UPLOAD);
			String[] arrImg = urlImg.split("\\.");
			int lengh = arrImg.length;
			if (!arrImg[lengh - 1].toLowerCase().equals("jpg")
					&& !arrImg[lengh - 1].toLowerCase().equals("jpeg")
					&& !arrImg[lengh - 1].toLowerCase().equals("png")
					&& !arrImg[lengh - 1].toLowerCase().equals("tiff")
					&& !arrImg[lengh - 1].toLowerCase().equals("gif")
					&& !arrImg[lengh - 1].toLowerCase().equals("bmp")) {
				throw new CustomError.GeneralError("Ảnh không đúng định dạng");
			} else {
				users.setImg(uploadService.saveFileVer(image, ConstantPage.PATH_SAVE_USER_UPLOAD));
			}
		} else
			users.setImg(usersFinByEmail.getImg());
		boolean isSuccess = usersService.edit(users);
		return new ResponseEntity<>(isSuccess, HttpStatus.OK);
	}

	@PostMapping(value = ConstantPage.REST_API_REGISTER, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<Object> register(@RequestParam("user") String user) throws UnsupportedEncodingException {
		JSONObject jsonObject = new JSONObject(user);
		String fullname = jsonObject.getString("fullname");
		String email = jsonObject.getString("email");
		Users userFindByEmail = usersService.findByEmail(email);
		String password = jsonObject.getString("password");
		String phone = jsonObject.getString("phone");
		String str = Base64.getEncoder().encodeToString(email.getBytes("utf-8"));
		String url = ConstantPage.BASE_URL_CLIENT + "/hometotal/activeregister/?email=" + email + "&base64=" + str;
		String content = "Đăng kí thành công tài khoản " + email + "<br>Để kích hoạt vui lòng ấn " + "<a href=" + url
				+ ">vào đây</a> <br>" + "Thân gửi! <br><br>";
//				+ "<img style='width: 15%' src='https://www.cmc.com.vn/sites/default/files/screenshot_1.png' alt='cmc global' title='cmc global'> <br><br>"
//				+ "Địa chỉ: Phố Duy Tân, phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội <br>"
//				+ "Tel: 04. 3 795 8668   |   Fax: 04. 3 795 8989 <br>" + "Website: http://www.cmc.com.vn";
		String encodePass = passEncode.encode(password);
		if (userFindByEmail != null) {
			return new ResponseEntity<Object>("Error!", HttpStatus.BAD_REQUEST);
		} else {
			Users users = new Users();
			users.setFullname(fullname);
			users.setEmail(email);
			users.setPassword(encodePass);
			users.setAddress("");
			users.setBirthday("");
			users.setImg("");
			users.setPhone(phone);
			users.setStatus(0);
			Role defaultRole = roleService.findByName("USER");
			Set<Role> defaultSet = new HashSet<>();
			try {
			users.setRole(defaultSet);
			users.addRole(defaultRole);
			} catch(Exception e) {
				e.printStackTrace();
			}
			boolean isSuccess = usersService.edit(users);
			String title = "Kích hoạt tài khoản";
			new Thread(() -> {
				sendEmail(email, content, title);
			}).start();
			return new ResponseEntity<Object>(isSuccess, HttpStatus.OK);
		}
	}

	@GetMapping(value = ConstantPage.REST_API_ACTIVE_USER, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<Object> checkVerifyEmail(@RequestParam String email, @RequestParam String access)
			throws UnsupportedEncodingException {
		Users userFindByEmail = usersService.findByEmail(email);
		if (access.equals(Base64.getEncoder().encodeToString(email.getBytes("utf-8")))) {
			userFindByEmail.setStatus(1);
		}
		boolean isSuccess = usersService.edit(userFindByEmail);
		return new ResponseEntity<Object>(isSuccess, HttpStatus.OK);
	}

	@PostMapping(value = ConstantPage.REST_API_FORGOT_PASSWORD, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<Object> fotgotPassWord(@RequestParam("user") String user)
			throws UnsupportedEncodingException {
		JSONObject jsonObject = new JSONObject(user);
		String email = jsonObject.getString("email");
		Users userFindByEmail = usersService.findByEmail(email);

		if (userFindByEmail == null) {
			return new ResponseEntity<Object>("Tài khoản không tồn tại!", HttpStatus.NOT_FOUND);
		} else if (userFindByEmail.getStatus() == 0) {
			return new ResponseEntity<Object>("Tài khoản chưa được kích hoạt!", HttpStatus.FORBIDDEN);
		} else if (userFindByEmail.getStatus() == 1) {
			String url = ConstantPage.BASE_URL_CLIENT + "/hometotal/activeforgot/?email=" + email;
			String content = "Chúng tôi nhận được yêu cầu thay đổi mật khẩu tài khoản: " + email
					+ "<br>Nếu đúng là bạn vui lòng ấn " + "<a href=" + url + ">vào đây</a> <br>" + "Thân gửi! <br><br>"
					+ "<img style='width: 15%' src='https://www.cmc.com.vn/sites/default/files/screenshot_1.png' alt='cmc global' title='cmc global'> <br><br>"
					+ "Địa chỉ: Phố Duy Tân, phường Dịch Vọng Hậu, Cầu Giấy, Hà Nội <br>"
					+ "Tel: 04. 3 795 8668   |   Fax: 04. 3 795 8989 <br>" + "Website: http://www.cmc.com.vn";
			String title = "Thay đổi mật khẩu";
			boolean isSuccess = usersService.edit(userFindByEmail);
			new Thread(() -> {
				sendEmail(email, content, title);
			}).start();
			return new ResponseEntity<Object>(true, HttpStatus.OK);
		}
		return new ResponseEntity<Object>("EXPECTATION FAILED", HttpStatus.EXPECTATION_FAILED);
	}

	@PostMapping(value = ConstantPage.REST_API_ACTIVE_FORGET_PASSWORD, produces = {
			MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<Object> activeFotgotPassWord(@RequestParam("user") String user)
			throws UnsupportedEncodingException {
		JSONObject jsonObject = new JSONObject(user);
		String email = jsonObject.getString("email");
		String password = jsonObject.getString("password");
		String encodePass = passEncode.encode(password);
		Users userFindByEmail = usersService.findByEmail(email);
		userFindByEmail.setPassword(encodePass);
		boolean isSuccess = usersService.edit(userFindByEmail);
		return new ResponseEntity<Object>(isSuccess, HttpStatus.OK);

	}

	@PostMapping(value = ConstantPage.REST_API_CHANGE_PASSWORD, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<Object> changePassWord(@RequestParam("user") String user) {
		JSONObject jsonObject = new JSONObject(user);
		System.out.println("jsonObject: " + jsonObject);
		String email = jsonObject.getString("email");
		String password = jsonObject.getString("password");
		String encodePass = passEncode.encode(password);
		Users users = usersService.findByEmail(email);
		users.setPassword(encodePass);
		boolean isSuccess = usersService.edit(users);
		return new ResponseEntity<Object>(isSuccess, HttpStatus.OK);
	}

	/* ---------------- UPDATE STATUS USER ------------------------ */
	@PostMapping(value = ConstantPage.REST_API_UPDATE_USERS_ACTIVE, produces = {
			MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<Object> updateUserStatus(@RequestParam("user") String user) {
		// parse JSONstring to JSONobject
		JSONObject jsonObject = new JSONObject(user);
		int id = jsonObject.getInt("id");
		int status = jsonObject.getInt("status");
		Users users = usersService.findById(id);
		users.setStatus(status);
		boolean isSuccess = usersService.edit(users);
		return new ResponseEntity<>(isSuccess, HttpStatus.OK);
	}

	/* ---------------- Search User ------------------------ */
	@PostMapping(value = ConstantPage.REST_API_SEARCH_USERS)
	public List<Users> searchUser(@RequestParam("data") String data) {
		JSONObject jsonObject = new JSONObject(data);
		String key = jsonObject.getString("key");
		List<Users> list = usersService.searchUser(key);
		return list;
	}

	/* ----------------Sort User ------------------------ */
	@PostMapping(value = ConstantPage.REST_API_SORT_USERS)
	public List<Users> sortUser(@RequestParam("data") String data) {
		JSONObject jsonObject = new JSONObject(data);
		String key = jsonObject.getString("key");
		String type = jsonObject.getString("type");
		List<Users> list = usersService.sortUser(key, type);
		return list;
	}

	/* ---------------- GET USER BY ID ------------------------ */
	@GetMapping(value = ConstantPage.REST_API_GET_USER_BY_ID)
	public ResponseEntity<Object> getUserById(@PathVariable int userId) {
		Users users = usersService.findById(userId);
		if (users != null) {
			return new ResponseEntity<Object>(users, HttpStatus.OK);
		}
		return new ResponseEntity<Object>("Not Found User", HttpStatus.NO_CONTENT);
	}

	/* ---------------- GET USER BY EMAIL ------------------------ */
	@PostMapping(value = ConstantPage.REST_API_PROFILE_USER)
	public Users profileusers(@RequestParam("data") String data) {
		JSONObject jsonObject = new JSONObject(data);
		String email = jsonObject.getString("email");
		Users users = usersService.findByEmail(email);
		return users;
	}

	/* ---------------- LOGIN ------------------------ */
	public boolean sendEmail(String emailDes, String content, String title) {
		try {
			Email email = new SimpleEmail();
			System.out.println("send mail");

			// Cấu hình thông tin Email Server
			email.setHostName("smtp.googlemail.com");
			email.setSmtpPort(587);
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
//			email.setMsg(content);

			// Người nhận
			email.addTo(emailDes);
			email.send();

			System.out.println("send success!");
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	// CONGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
	/* show matrix users-role */
	@PostMapping(value = ConstantPage.REST_API_ROLE_USER)
	public Users addUserRole(@RequestParam String email, @RequestParam String roleName) {
		try {
			Users users = usersService.findByEmail(email);
			Role role = roleService.getRoleByName(roleName);
			users.addRole(role);
			usersService.saveUser(users);
			return users;
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@GetMapping(value = ConstantPage.REST_API_ALL_ROLE_USER, produces = "application/json")
	public Map<String, String> getAllUserRole() {
		try {
			Map<String, String> result = new HashMap<>();
			String value = "";
			List<Object[]> listUsersRole = usersService.getAllUserRole();
			int length = listUsersRole.size();
			for (int i = 0; i < length; i++) {
				Object[] list = listUsersRole.get(i);
				value += list[0] + "," + list[1];
				if (i != length - 1) {
					value += ",";
				}
			}
			result.put("response", value);
			return result;
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@PostMapping(value = ConstantPage.REST_API_REMOVE_ROLE_USER, produces = "application/json")
	public Users removeUserRole(@RequestParam String email, @RequestParam String roleName) {
		try {
			Users users = usersService.findByEmail(email);
			Role role = roleService.getRoleByName(roleName);
			users.removeRole(role);
			usersService.saveUser(users);
			return users;
		} catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@GetMapping(value = ConstantPage.REST_API_LIST_EXAM_OF_USER, produces = "application/json")
	public List<Object> getListExamOfUser(@RequestParam String email) {
		Users userFindByEmail = usersService.findByEmail(email);
		List<Integer> groupId = usersService.getGroupOfUser(userFindByEmail.getId());
		return usersService.getlistExamOfUser(userFindByEmail.getId(),groupId);
	}

	@GetMapping(value = ConstantPage.REST_API_SEARCH_USER_ROLE, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public List<Object> sortChapterByName(@RequestParam String fullname) {
		return usersService.searchUserByName(fullname);
	}

	// Edit Profile
	@PostMapping(value = ConstantPage.REST_API_CHANGE_PROFILE, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<Object> changeProfile(@RequestParam("user") String user,
			@RequestParam(required = false) MultipartFile image) {
		JSONObject jsonObject = new JSONObject(user);
		// int id = jsonObject.getInt("id");
		String email = jsonObject.getString("email");
		String fullname = jsonObject.getString("fullname");
		String sbirthday = jsonObject.getString("birthday");
		String phone = jsonObject.getString("phone");
		String address = jsonObject.getString("address");
		Users userFindbyEmail = usersService.findByEmail(email);
		userFindbyEmail.setFullname(fullname);
		userFindbyEmail.setPhone(phone);
		userFindbyEmail.setAddress(address);
		userFindbyEmail.setBirthday(sbirthday);
		if (image != null) {
			String urlImg = uploadService.saveFileVer(image, ConstantPage.PATH_SAVE_USER_UPLOAD);
			String[] arrImg = urlImg.split("\\.");
			int lengh = arrImg.length;
			if (!arrImg[lengh - 1].toLowerCase().equals("jpg")
					&& !arrImg[lengh - 1].toLowerCase().equals("jpeg")
					&& !arrImg[lengh - 1].toLowerCase().equals("png")
					&& !arrImg[lengh - 1].toLowerCase().equals("tiff")
					&& !arrImg[lengh - 1].toLowerCase().equals("gif")
					&& !arrImg[lengh - 1].toLowerCase().equals("bmp")) {
				throw new CustomError.GeneralError("Ảnh không đúng định dạng");
			} else {
				userFindbyEmail.setImg(uploadService.saveFileVer(image, ConstantPage.PATH_SAVE_USER_UPLOAD));
			}
		} else
			userFindbyEmail.setImg(userFindbyEmail.getImg());
		boolean isSuccess = usersService.edit(userFindbyEmail);
		return new ResponseEntity<Object>(isSuccess, HttpStatus.OK);
	}

	@GetMapping(value = ConstantPage.REST_API_DETAIL_USER, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public Users userDetail(@RequestParam String email) {
		Users userFindByEmail = usersService.findByEmail(email);
		return userFindByEmail;
	}

	@PostMapping(value = ConstantPage.REST_API_CHANGE_PROFILE_NO_IMAGE, produces = {
			MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<Object> changeProfileNoImgae(@RequestParam("user") String user) {
		JSONObject jsonObject = new JSONObject(user);
		int id = jsonObject.getInt("id");
	//	String email = jsonObject.getString("email");
		String fullname = jsonObject.getString("fullname");
	//	Date birthday = new Date();
	//	DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
	//	String strDate = dateFormat.format(birthday);
		String sbirthday = jsonObject.getString("birthday");
		String phone = jsonObject.getString("phone");
		String address = jsonObject.getString("address");
		Users userFindbyEmail = usersService.findById(id);
		userFindbyEmail.setFullname(fullname);
		userFindbyEmail.setPhone(phone);
		userFindbyEmail.setAddress(address);
		userFindbyEmail.setBirthday(sbirthday);
		boolean isSuccess = usersService.edit(userFindbyEmail);
		return new ResponseEntity<Object>(isSuccess, HttpStatus.OK);
	}

	@GetMapping(value = ConstantPage.REST_API_LIST_EXAM_COMPLETE)
	public List<Object> listExamUserCompleted(@PathVariable int userId) {
		return usersService.getListExamUserCompleted(userId);
	}

	// MR DUC thêm ngày 5.1.2019 ********* START *********

	@GetMapping(value = ConstantPage.REST_API_LIST_PRACTICE_COMPLETE)
	public List<Object> listPracticeUserCompleted(@PathVariable int userId) {
		return usersService.getListPracticeUserCompleted(userId);
	}

	@GetMapping(value = ConstantPage.REST_API_LIST_PRACTICE_BY_USER, produces = "application/json")
	public List<Object> getListPracticeOfUser(@RequestParam String email) {
		Users userFindByEmail = usersService.findByEmail(email);
		return usersService.getListPracticeOfUser(userFindByEmail.getId());
	}

	@GetMapping(value = ConstantPage.REST_API_GET_EXAM_ASC_BY_END_DATE, produces = {
			MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public List<Object> getListExamOfUserASCBYEndDate(@RequestParam int id) {
		return usersService.getListExamOfUserASCBYEndDate(id);
	}

	// MR DUC thêm ngày 5.1.2019 ********* END *********

	@PostMapping(value = ConstantPage.REST_API_ACTIVE_ACCOUNT, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<Object> activeAccout(@RequestParam("email") String email) {
		Users userFindByEmail = usersService.findByEmail(email);
		userFindByEmail.setStatus(1);
		boolean isSucces = usersService.edit(userFindByEmail);
		return new ResponseEntity<Object>(isSucces, HttpStatus.OK);
	}

	@GetMapping(value = ConstantPage.REST_API_LOGOUT_USER, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<Object> logout(@RequestParam("tk") String tk) {
		String token = request.getHeader("Token");
	    token=token.substring(5);
	    String username = jwtService.getUsernameFromToken(token);
	    Users userFindByEmail = usersService.findByEmail(username);
	    boolean isSuccess = usersService.edit(userFindByEmail);
		return new ResponseEntity<Object>(isSuccess, HttpStatus.OK);
	}

	@PostMapping(value = ConstantPage.REST_API_LOGIN_USER, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<Map<String, String>> login(@RequestParam("user") String user) {
		Map<String, String> response = new HashMap<>();
		JSONObject jsonObject = new JSONObject(user);
		String email = jsonObject.getString("email");
		String password = jsonObject.getString("password");
		Users users = usersService.findByEmail(email);
		HttpStatus httpStatus = null;
		if (users != null) {
		String listPermissionAndMenu = roleService.getAllMenuAndPermission(users.getId());
		String result = "";
		String role = "";
		List<GrantedAuthority> listAuth;
			Timestamp timestamp = new Timestamp(System.currentTimeMillis());
			long currentTime = timestamp.getTime();
			if (users.getLoggingTime () == null) {
				Date date = new Date();
                java.sql.Date sqlDate = new java.sql.Date(date.getTime());
				users.setLoggingTime(sqlDate);
			}
			Timestamp loggingTime = new Timestamp(users.getLoggingTime().getTime());
			long ts = loggingTime.getTime();

		if (users.isTest()==false) {
				if (passEncode.matches(password, users.getPassword()) && users.getStatus() == 1) {
					try {
						Date date = new Date();
						java.sql.Date sqlDate = new java.sql.Date(date.getTime());
						users.setLoggingTime(sqlDate);
						boolean isSuccess = usersService.edit(users);
						result = jwtService.generateTokenLogin(users.getEmail());
						listAuth = users.getAuthorities();
						for (GrantedAuthority grantedAuthority : listAuth) {
							role += grantedAuthority.toString() + ",";
						}
						response.put("response", result);
						response.put("roleandpermission", listPermissionAndMenu);
						response.put("email", users.getEmail());
						response.put("role", role);
						httpStatus = HttpStatus.OK;
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
						throw new CustomError.GeneralError("Hệ thống gặp sự cố!");
					}
					}else if (passEncode.matches(password, users.getPassword()) &&  users.getStatus() == 0) {
						throw new CustomError.GeneralError("Tài khoản chưa được kích hoạt");
					} else if (passEncode.matches(password, users.getPassword()) &&  users.getStatus() == 2) {
						throw new CustomError.GeneralError("Tài khoản đang bị khóa");
					} else {
						throw new CustomError.GeneralError("Tài khoản hoặc mật khẩu không hợp lệ");
					}
				}else {
					throw new CustomError.GeneralError("Tài khoản đang thi bạn không thể đăng nhập!");
				}
			}else {
				throw new CustomError.GeneralError("Tài khoản không tồn tại");
			}
		return new ResponseEntity<Map<String, String>>(response, httpStatus);
	}

	@PostMapping(value = ConstantPage.REST_API_LOGOUT_USER, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<Object> logout() {
		String token = request.getHeader("Token");
	    token=token.substring(5);
	    String username = jwtService.getUsernameFromToken(token);
	    Users userFindByEmail = usersService.findByEmail(username);
	    userFindByEmail.setLoggingTime(null);
	    boolean isSuccess = usersService.edit(userFindByEmail);
	    return new ResponseEntity<Object>(isSuccess, HttpStatus.OK);
	}

	@GetMapping(value = ConstantPage.REST_API_COMPLETE_LIST_USER)
	public List<Exam_Result> getListUsersComplete(@RequestParam("listUser") List<Integer> listUser,
			@RequestParam int examId) {
		List<Exam_Result> response = new ArrayList<>();
		try {
			List<Object> result = usersService.getListUserComplete(listUser, examId);
			for (Object obj : result) {
				JSONArray array = new JSONArray(obj);
				response.add(examResultService.findById(Integer.parseInt(array.get(0).toString())));
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
		return response;
	}

	@GetMapping(value = ConstantPage.REST_API_INCOMPLETE_LIST_USER)
	public List<Users> getListUsersInComplete(@RequestParam("listUser") List<Integer> listUser,
			@RequestParam List<Integer> listComplete) {
		try {
			List<Users> result = usersService.getListUserInComplete(listUser, listComplete);
			return result;
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
			return null;
		}
	}
	@GetMapping(value = ConstantPage.REST_API_CHECK_TOKEN)
	public ResponseEntity<Map<String, String>>  checkToken(@RequestParam("email") String email) {
		Users users = usersService.findByEmail(email);
		String listPermissionAndMenu = roleService.getAllMenuAndPermission(users.getId());
		String result = "";
		String role = "";
		Map<String, String> response = new HashMap<>();
		List<GrantedAuthority> listAuth;
		HttpStatus httpStatus = null;
		if (users != null) {
			Timestamp timestamp = new Timestamp(System.currentTimeMillis());
			long currentTime = timestamp.getTime();
			if (users.getLoggingTime () == null) {
				Date date = new Date();
                java.sql.Date sqlDate = new java.sql.Date(date.getTime());
				users.setLoggingTime(sqlDate);
			}
			Timestamp loggingTime = new Timestamp(users.getLoggingTime().getTime());
			long ts = loggingTime.getTime();

		if (users.isTest()==false) {
				if ( users.getStatus() == 1) {
					try {
						Date date = new Date();
						java.sql.Date sqlDate = new java.sql.Date(date.getTime());
						users.setLoggingTime(sqlDate);
						boolean isSuccess = usersService.edit(users);
						result = jwtService.generateTokenLogin(users.getEmail());
						listAuth = users.getAuthorities();
						for (GrantedAuthority grantedAuthority : listAuth) {
							role += grantedAuthority.toString() + ",";
						}
						response.put("response", result);
						response.put("roleandpermission", listPermissionAndMenu);
						response.put("email", users.getEmail());
						response.put("role", role);
						httpStatus = HttpStatus.OK;
					} catch (Exception e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
						throw new CustomError.GeneralError("Hệ thống gặp sự cố!");
					}
					}else if (users.getStatus() == 0) {
						throw new CustomError.GeneralError("Tài khoản chưa được kích hoạt");
					} else if (users.getStatus() == 2) {
						throw new CustomError.GeneralError("Tài khoản đang bị khóa");
					}
				}else {
					throw new CustomError.GeneralError("Tài khoản đang thi bạn không thể đăng nhập!");
				}
			}
		return new ResponseEntity<Map<String, String>>(response, httpStatus);
		
	}
}

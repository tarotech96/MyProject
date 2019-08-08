
package global.testingsystem.controller;

import java.util.Date;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import global.testingsystem.entity.CustomError;
import global.testingsystem.entity.Exam;
import global.testingsystem.entity.Exam_Result;
import global.testingsystem.entity.Users;
import global.testingsystem.service.ExamResultService;
import global.testingsystem.service.ExamService;
import global.testingsystem.service.UsersService;
import global.testingsystem.util.ConstantPage;

@CrossOrigin(origins = "*")
@RestController
public class ExamResultController {
	private ExamResultService examResultService;
	private ExamService examService;
	private UsersService usersService;
	@Autowired
	public ExamResultController(ExamResultService examResultService, ExamService examService, UsersService usersService) {
		this.examResultService = examResultService;
		this.examService = examService;
		this.usersService = usersService;
	}
	
	@PostMapping(value = ConstantPage.REST_API_INSERT_EXAM_RESULT, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public Integer insert(@RequestParam("examResult") String examResult){
		JSONObject jsonObject = new JSONObject(examResult);
		Exam_Result exam_Result = new Exam_Result();
		int exam_id = jsonObject.getInt("exam_id");
		Exam ex = examService.findById(exam_id);
		exam_Result.setExam(ex);
		
		String email = jsonObject.getString("email");
		Users users = usersService.findByEmail(email);
	
		exam_Result.setUsers(users);
		
		exam_Result.setBy_chapter(0);
		
		exam_Result.setBy_domain(0);
		
		exam_Result.setCompleted(0);
		 Date date = new Date();
	     java.sql.Date sqlDate = new java.sql.Date(date.getTime());
		exam_Result.setStart_date(sqlDate);
		
		exam_Result.setTotal_score(0);
		
		exam_Result.setCorrect_num(0);
		
		exam_Result.setCreated_at(sqlDate);
		
		exam_Result.setTime("00:00");
		boolean isSuccess = examResultService.insert(exam_Result);
		return examResultService.findFirstByOrderByIdDesc().getId();
	}
	@GetMapping(value="/examResult/getExamResultByUserExam")
	public Exam_Result getExamResultByUserExam(@RequestParam int idExamResult,@RequestParam int examId) {
		Exam_Result examResult = examResultService.getUserResultByUserExam(idExamResult, examId);
		return examResult;
	}
	
	
	@GetMapping(value="/examResult/getListExamResultByUserIDExamID")
	public List<Exam_Result> getListExamResultByUserIDExamID(@RequestParam int userId,@RequestParam int examId) {
		List<Exam_Result> temp= examResultService.getListExamResultByUserIDExamID(userId, examId);
		return temp;
	}
	@GetMapping(value="/examResult/getListPracticeResultByUserIDPracticeID")
	public List<Exam_Result> getListPracticeResultByUserIDPracticeID(@RequestParam int userId,@RequestParam int practiceId) {
		List<Exam_Result> temp= examResultService.getListPracticeResultByUserIDPracticeID(userId, practiceId);
		return temp;
	}
	
	@PostMapping(value=ConstantPage.REST_API_UPDATE_COMPLETE_RESULT)
	public boolean updateComplete(@RequestParam("data") String data)
	{
		JSONObject jsonObject = new JSONObject(data);
		int resultId= jsonObject.getInt("result_id");
		Exam_Result er = examResultService.findById(resultId);
		Users user = er.getUsers();
		user.setTest(false);
		usersService.saveUser(user);
		if(er.getTotal_score()*100>=er.getExam().getPercent_passing())er.setPass(true);
		else er.setPass(false);
		er.setCompleted(1);
		examResultService.update(er);
		return true;
		
	}
	@PostMapping(value=ConstantPage.REST_API_UPDATE_TIME_RESULT)
	public boolean updateTime(@RequestParam("data") String data)
	{
		JSONObject jsonObject = new JSONObject(data);
		int resultId= jsonObject.getInt("result_id");
		String time=jsonObject.getString("time");
		int completed= jsonObject.getInt("complete");
		Exam_Result er = examResultService.findById(resultId);
//		if(er.getTotal_score()*100>=er.getExam().getPercent_passing())er.setPass(true);
//		else er.setPass(false);
		er.setTime(time);
		er.setCompleted(completed);
		examResultService.update(er);
		return true;
		
	}
	@GetMapping(value=ConstantPage.REST_API_GET_IS_TEST_USER)
	public boolean checkUserTest(@RequestParam("email") String email)
	{
		Users checkUser = usersService.findByEmail(email);
		return checkUser.isTest();
		
	}
	@GetMapping(value=ConstantPage.API_SET_USER_TEST)
	public boolean setTestUser(@RequestParam("email") String email)
	{
		Users user = usersService.findByEmail(email);
		user.setTest(true);
		usersService.saveUser(user);
		return true;
		
	}
}


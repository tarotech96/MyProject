package global.testingsystem.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import global.testingsystem.entity.Exam;
import global.testingsystem.entity.Exam_Answer;
import global.testingsystem.entity.Exam_Result;
import global.testingsystem.entity.Question;
import global.testingsystem.entity.Users;
import global.testingsystem.service.ExamAnswerService;
import global.testingsystem.service.ExamResultService;
import global.testingsystem.service.ExamService;
import global.testingsystem.service.QuestionService;
import global.testingsystem.service.UsersService;
import global.testingsystem.util.ConstantPage;

@RestController
@CrossOrigin(origins = "*")
public class ExamAnswerController {
	private ExamAnswerService examAnswerService;
	
	private ExamResultService examResultService;
	
	private UsersService userService;
	
	private QuestionService questionService;
	
	private ExamService examService;
	
	@Autowired
	public ExamAnswerController(ExamAnswerService examAnswerService, ExamResultService examResultService, QuestionService questionService,ExamService examService,UsersService userService) {
		this.examAnswerService = examAnswerService;
		this.examResultService = examResultService;
		this.questionService = questionService;
		this.examService = examService;
		this.userService=userService;
	}
	
	@PostMapping(value = ConstantPage.REST_API_UPDATE_EXAM_RESULT, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<Object> updateResult(@RequestParam("data") String data){
		JSONObject jsonObject = new JSONObject(data);
		JSONArray jsonArray = jsonObject.getJSONArray("listQuestion");
		int result_id = jsonObject.getInt("result_id");	
		int totalQuestion =  jsonArray.length() ;
		Exam_Result exam_Result = examResultService.findById(result_id);
	    Users user = exam_Result.getUsers();
	    user.setTest(false);
	    userService.saveUser(user);
		if(exam_Result.getCompleted()==0) {
		Exam exam=exam_Result.getExam();
		if(jsonArray.length() != 0) {
			int lenQuestion=jsonArray.length();
			int correctNumber = 0;
			int correctNumberByChapter = 0;
			int correctNumberByDomain = 0;
			for (int i = 0; i < lenQuestion; i++) {
				Exam_Answer exam_Answer = new Exam_Answer();
			    JSONObject object = jsonArray.getJSONObject(i);
				int question_id = object.getInt("question_id");		
				Question ques= questionService.getQuestionById(question_id);
				JSONArray jsonAnswer = object.getJSONArray("answer");
				int lenAnswer= jsonAnswer.length();
				if(lenAnswer>0) {
					exam_Answer.setChoose_answer(jsonAnswer.toString());
					exam_Answer.setQuestion_id(question_id);
					exam_Answer.setResult_id(result_id);
					examAnswerService.insert(exam_Answer);
					List<Integer> chooseAnswer = new ArrayList<Integer>();
					for (int j=0;j<lenAnswer;j++) chooseAnswer.add(jsonAnswer.getInt(j));
				    List<Integer> AnswerCorrect = examAnswerService.getListAnswerCorrectQuestionId(question_id);
				   if(chooseAnswer != null && AnswerCorrect != null) {
					if(checkAnswer(chooseAnswer,AnswerCorrect)) {
						correctNumber ++;
						if(ques.getChapter() != null) {
							correctNumberByChapter ++;
						}
						if(ques.getDomain() != null) {
							correctNumberByDomain ++;
						}
					}
				}
			
			  }
			}
			  exam_Result.setCorrect_num(correctNumber);
			  float passing=(float)correctNumber/totalQuestion;
			  exam_Result.setBy_chapter(correctNumberByChapter);
	          exam_Result.setBy_domain(correctNumberByDomain);
	          if(passing*100<exam.getPercent_passing())exam_Result.setPass(false);
	          else exam_Result.setPass(true);
	          exam_Result.setTotal_score(passing);
		}
			Date date = new Date();
			long endSecond=date.getTime()/1000;
			long startSecond=exam_Result.getStart_date().getTime()/1000;
		    long minute=(endSecond-startSecond)/60;
		    long second=(endSecond-startSecond)%60;
		    String time=(minute<10?(minute + ""):String.valueOf(minute))+ ":"+ (second<10?(second + ""):String.valueOf(second));
		    exam_Result.setTime(time);
			if((endSecond+15-startSecond)/60 <= exam.getTime()) exam_Result.setCompleted(1);
			else  exam_Result.setCompleted(2);
            java.sql.Date sqlDate = new java.sql.Date(date.getTime());
            exam_Result.setEnd_date(sqlDate);
            exam_Result.setUpdate_at(sqlDate);
            examResultService.update(exam_Result);
		}
		 return new ResponseEntity<Object>( true, HttpStatus.OK);
	}
	@PostMapping(value = ConstantPage.REST_API_GET_FREE_TEST_RESULT, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public Exam_Result getResultFreeTest(@RequestParam("data") String data){
		JSONObject jsonObject = new JSONObject(data);
		JSONArray jsonArray = jsonObject.getJSONArray("listQuestion");
		int examId=jsonObject.getInt("exam_id");
		String time= jsonObject.getString("time");
		int totalQuestion =  jsonArray.length() ;
		Exam_Result exam_Result = new Exam_Result();
		Exam exam=examService.findById(examId);
		exam_Result.setExam(exam);
		if(jsonArray.length() != 0) {
			int lenQuestion=jsonArray.length();
			int correctNumber = 0;
			int correctNumberByChapter = 0;
			int correctNumberByDomain = 0;
			for (int i = 0; i < lenQuestion; i++) {
				Exam_Answer exam_Answer = new Exam_Answer();
			    JSONObject object = jsonArray.getJSONObject(i);
				int question_id = object.getInt("question_id");		
				Question ques= questionService.getQuestionById(question_id);
				JSONArray jsonAnswer = object.getJSONArray("answer");
				int lenAnswer= jsonAnswer.length();
				if(lenAnswer>0) {
					exam_Answer.setChoose_answer(jsonAnswer.toString());
					exam_Answer.setQuestion_id(question_id);
					examAnswerService.insert(exam_Answer);
					List<Integer> chooseAnswer = new ArrayList<Integer>();
					for (int j=0;j<lenAnswer;j++) chooseAnswer.add(jsonAnswer.getInt(j));
				    List<Integer> AnswerCorrect = examAnswerService.getListAnswerCorrectQuestionId(question_id);
				   if(chooseAnswer != null && AnswerCorrect != null) {
					if(checkAnswer(chooseAnswer,AnswerCorrect)) {
						correctNumber ++;
						if(ques.getChapter() != null) {
							correctNumberByChapter ++;
						}
						if(ques.getDomain() != null) {
							correctNumberByDomain ++;
						}
					}
				}
			
			  }
			}
			  exam_Result.setCorrect_num(correctNumber);
			  float passing=(float)correctNumber/totalQuestion;
			  exam_Result.setBy_chapter(correctNumberByChapter);
	          exam_Result.setBy_domain(correctNumberByDomain);
	          exam_Result.setTotal_score(passing);
		}
			Date date = new Date();
//			long endSecond=date.getTime()/1000;
//			long startSecond=exam_Result.getStart_date().getTime()/1000;
//		    long minute=(endSecond-startSecond)/60;
//		    long second=(endSecond-startSecond)%60;
//		    String time=(minute<10?(minute + ""):String.valueOf(minute))+ ":"+ (second<10?(second + ""):String.valueOf(second));
		    exam_Result.setTime(time);
			 exam_Result.setCompleted(1);
            java.sql.Date sqlDate = new java.sql.Date(date.getTime());
            exam_Result.setEnd_date(sqlDate);
            exam_Result.setUpdate_at(sqlDate);
		
		 return exam_Result;
	}
	@PostMapping(value=ConstantPage.REST_API_INSERT_EXAM_ANSWER)
	public ResponseEntity<Object> insert(@RequestParam("data") String data){
		JSONObject jsonObject = new JSONObject(data);
		Exam_Answer examAnswer = new Exam_Answer();
		int result_id = jsonObject.getInt("result_id");
		int question_id  = jsonObject.getInt("question_id");
		int completed= jsonObject.getInt("complete");
		String time= jsonObject.getString("time");
	    examAnswer.setResult_id(result_id);
		examAnswer.setQuestion_id(question_id);
		JSONArray jsonAnswer =  jsonObject.getJSONArray("answer");
		examAnswer.setChoose_answer(jsonAnswer.toString());
		
		Exam_Result er=examResultService.findById(result_id);
		er.setCompleted(completed);
		er.setTime(time);
		Question que=questionService.getQuestionById(question_id);
		List<Integer> answerCorrect = examAnswerService.getListAnswerCorrectQuestionId(question_id);
		List<Integer> chooseAnswer = new ArrayList<Integer>();
		int lenAnswer=jsonAnswer.length();
		for (int j=0;j<lenAnswer;j++) chooseAnswer.add(jsonAnswer.getInt(j));
		  if(chooseAnswer != null && answerCorrect != null) {
				if(checkAnswer(chooseAnswer, answerCorrect)) {
					er.setCorrect_num(er.getCorrect_num()+1);
					if(que.getChapter() != null) {
						er.setBy_chapter(er.getBy_chapter() + 1);
					}
					if(que.getDomain() != null) {
						er.setBy_domain(er.getBy_domain() + 1);
					}
					er.setTotal_score(er.getTotal_score() + (float)1/(er.getExam().getQuestion_num()));
				}
				
			}
		  boolean isSuccess = examAnswerService.insert(examAnswer);
	 return new ResponseEntity<Object>( isSuccess, HttpStatus.OK);
	}
	
	
	@PostMapping(value = ConstantPage.REST_API_DELETE_EXAM_ANSWER)
	public ResponseEntity<Object> delete(@RequestParam("data") String data) {
		JSONObject jsonObject = new JSONObject(data);		
	    int result_id = (jsonObject.getInt("result_id"));
		int question_id  = (jsonObject.getInt("question_id"));
		int completed= jsonObject.getInt("complete");
		String time= jsonObject.getString("time");
		Exam_Result er=examResultService.findById(result_id);
		Question que=questionService.getQuestionById(question_id);
		er.setCompleted(completed);
		er.setTime(time);
		List<Integer> answerCorrect = examAnswerService.getListAnswerCorrectQuestionId(question_id);
		List<Integer> beforeAnswer=new ArrayList<Integer>();
		String before_answer=examAnswerService.getChoose_answer(result_id, question_id);
		 String[] array = before_answer.split("\\[");
		  array = array[1].split("\\]");
		  array = array[0].split(",");
		 for(String s : array) beforeAnswer.add(Integer.valueOf(s));
		 if(checkAnswer(beforeAnswer, answerCorrect)) {
			 er.setCorrect_num(er.getCorrect_num()-1);
				if(que.getChapter() != null) {
					er.setBy_chapter(er.getBy_chapter() - 1);
				}
				if(que.getDomain() != null) {
					er.setBy_domain(er.getBy_domain() - 1);
				}
				er.setTotal_score(er.getTotal_score() - (float)1/(er.getExam().getQuestion_num()));
		 }
		 
		examAnswerService.deleteExamAnswer(result_id, question_id);
	 return new ResponseEntity<Object>( true, HttpStatus.OK);	
	}
	
	@PostMapping(value=ConstantPage.REST_API_UPDATE_EXAM_ANSWER)
	public ResponseEntity<Object> update(@RequestParam("data") String data){
		JSONObject jsonObject = new JSONObject(data);
	    int result_id = jsonObject.getInt("result_id");
		int question_id = jsonObject.getInt("question_id");
		JSONArray jsonAnswer =  jsonObject.getJSONArray("answer");
		String choose_answer= jsonAnswer.toString();
		int completed= jsonObject.getInt("complete");
		String time= jsonObject.getString("time");
		Exam_Result er=examResultService.findById(result_id);
		er.setCompleted(completed);
		er.setTime(time);
		Question que=questionService.getQuestionById(question_id);
		List<Integer> beforeAnswer=new ArrayList<Integer>();
		List<Integer> userAnswer=new ArrayList<Integer>();
		
		List<Integer> answerCorrect = examAnswerService.getListAnswerCorrectQuestionId(question_id);
		
		 
		 int lenAnswer=jsonAnswer.length();
		 for (int j=0;j<lenAnswer;j++) userAnswer.add(jsonAnswer.getInt(j));
		 
		String before_answer=examAnswerService.getChoose_answer(result_id, question_id);
		 String[] array = before_answer.split("\\[");
		  array = array[1].split("\\]");
		  array = array[0].split(",");
		 for(String s : array) beforeAnswer.add(Integer.valueOf(s));
	   
		 if(checkAnswer(beforeAnswer, answerCorrect)) {
			 if(!checkAnswer(userAnswer, answerCorrect)) {
			 er.setCorrect_num(er.getCorrect_num()-1);
				if(que.getChapter() != null) {
					er.setBy_chapter(er.getBy_chapter() - 1);
				}
				if(que.getDomain() != null) {
					er.setBy_domain(er.getBy_domain() - 1);
				}
				er.setTotal_score(er.getTotal_score() - (float)1/(er.getExam().getQuestion_num()));
			 }
		 }
		 else {
			 if(checkAnswer(userAnswer, answerCorrect)) {
				 er.setCorrect_num(er.getCorrect_num()+1);
					if(que.getChapter() != null) {
						er.setBy_chapter(er.getBy_chapter() + 1);
					}
					if(que.getDomain() != null) {
						er.setBy_domain(er.getBy_domain() + 1);
					}
					er.setTotal_score(er.getTotal_score() + (float)1/(er.getExam().getQuestion_num()));
			 }
		 }
	  examAnswerService.updateExamAnswer(choose_answer,result_id, question_id);
	 return new ResponseEntity<Object>( true, HttpStatus.OK);
	}
	@GetMapping(value = ConstantPage.REST_API_LIST_QUESTION_EXAM_BY_RESULT_ID)
	public List<Object> getListQuestionByResultId(@PathVariable int id) {
		return examAnswerService.getListQuestionByResultId(id);
		
	}
//	private void markExam(int resultId) {
//		Exam_Result er=examResultService.findById(resultId);
//		int correctNum=0;
//		int domain=0;
//		int chapter=0;
//		float total=0.0f;
//		Exam exam=er.getExam();
//		List<Object> listAnswer =  examAnswerService.getListQuestionByResultId(resultId);
//		//int len= listAnswer.size();
//		for(Object obj : listAnswer) {
//		Object[] tem=(Object[]) obj;
//		int questionId =(int) tem[0];
//		Question que=questionService.getQuestionById(questionId);
//		String answer= (String)tem[1];
//		List<Integer> answerUser= new ArrayList<Integer>();
//		  String[] array = answer.split("\\[");
//		  array = array[1].split("\\]");
//		  array = array[0].split(",");
//		 for(String s : array) answerUser.add(Integer.valueOf(s));
//		List<Integer> answerCorrect = examAnswerService.getListAnswerCorrectQuestionId(questionId);
//		if(!answerUser.retainAll(answerCorrect)) {
//			correctNum++;
//			if(que.getChapter() != null)chapter++;
//			if(que.getDomain() != null) domain++;
//		    }
//		  }
//		total=(float)correctNum/exam.getQuestion_num();
//		er.setBy_chapter(chapter);
//		er.setBy_domain(domain);
//		er.setCorrect_num(correctNum);
//		er.setTotal_score(total);
//		examResultService.update(er);
//		}
	private boolean checkAnswer(List<Integer> userAnswer , List<Integer> correctAnswer ) {
		if(correctAnswer==null) return false;
		else {
			if(userAnswer.size()==correctAnswer.size()) {
			   if(!correctAnswer.retainAll(userAnswer)) return true;
			   else return false;
			}
			else return false;
			
		}
	}

	}
	


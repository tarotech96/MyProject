package global.testingsystem.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.servlet.ServletContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import global.testingsystem.entity.Chapter_Exam;
import global.testingsystem.entity.CustomError;
import global.testingsystem.entity.Domain_Exam;
import global.testingsystem.entity.Exam;
import global.testingsystem.entity.Exam_Group;
import global.testingsystem.entity.Exam_Question;
import global.testingsystem.entity.Exam_Result;
import global.testingsystem.entity.Exam_Setting;
import global.testingsystem.entity.Group;
import global.testingsystem.entity.Question;
import global.testingsystem.entity.Subject;
import global.testingsystem.entity.Users;
import global.testingsystem.service.ChapterService;
import global.testingsystem.service.DomainService;
import global.testingsystem.service.ExamChapterService;
import global.testingsystem.service.ExamDomainService;
import global.testingsystem.service.ExamQuestionService;
import global.testingsystem.service.ExamResultService;
import global.testingsystem.service.ExamService;
import global.testingsystem.service.ExamSettingService;
import global.testingsystem.service.GroupService;
import global.testingsystem.service.QuestionService;
import global.testingsystem.service.UploadFileService;
import global.testingsystem.service.UsersService;
import global.testingsystem.service.impl.ExamGroupServiceImpl;
import global.testingsystem.service.impl.ExamServiceImpl;
import global.testingsystem.service.impl.ExamUserServiceImpl;
import global.testingsystem.service.impl.GroupServiceImpl;
import global.testingsystem.service.impl.SubjectServiceImpl;
import global.testingsystem.service.impl.UsersServiceImpl;
import global.testingsystem.util.ConstantPage;
import global.testingsystem.util.ExamSettingDto;

@CrossOrigin(origins = "*")
@RestController
public class ExamController {
	private ExamService examService;
	private SubjectServiceImpl subjectService;
	private ChapterService chapterServcie;
	private DomainService domainService;
	private UsersService usersService;
	private UploadFileService uploadService;
	private GroupService groupService;
	private ExamQuestionService examQuestionService;
	private QuestionService questionService;
	ExamChapterService examChapterService;
	ExamDomainService examDomainService;
	private ExamResultService examResultService;
	@Autowired
	private ExamUserServiceImpl examUserService;
	@Autowired
	private ExamGroupServiceImpl examGroupService;
	@Autowired
	private ExamSettingService examSettingService;
	@Autowired
	private ServletContext servletContext;
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	public ExamController(ExamServiceImpl examService, SubjectServiceImpl subjectService, UsersServiceImpl usersService,
			UploadFileService uploadService, GroupServiceImpl groupService, ExamQuestionService examQuestionService,
			QuestionService questionService, ExamDomainService examDomainService, ExamResultService examResultService,
			ExamChapterService examChapterService) {
		this.examService = examService;
		this.subjectService = subjectService;
		this.usersService = usersService;
		this.uploadService = uploadService;
		this.groupService = groupService;
		this.examQuestionService = examQuestionService;
		this.questionService = questionService;
		this.examChapterService = examChapterService;
		this.examDomainService = examDomainService;
		this.examResultService = examResultService;
	}

	@PostMapping(value = "/uploadFileExcel")
	public String readExcel(@RequestParam("file") MultipartFile file) {
		String pathToSave = uploadService.saveFileVer(file, ConstantPage.PATH_SAVE_EXAM_UPLOAD);
		examService.readExcel(servletContext.getRealPath(ConstantPage.PATH_SAVE_EXAM_UPLOAD) + "/" + pathToSave);
		return pathToSave;
	}

	// MR DUC
	@GetMapping(value = ConstantPage.REST_API_GET_PRACTICE_HOMEPAGE)
	public List<Object> listPracticeHomepage() {
		List<Object> list = examService.listPracticeHomepage();
		return list;
	}

	// MR DUC GET EXAM BY ID
	@GetMapping(value = ConstantPage.REST_API_GET_EXAM_BY_IDS, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public Object getExamByIDS(@RequestParam int id) {
		return examService.getExamByIDS(id);
	}

	@GetMapping(value = "/exam/getExamById/{id}")
	public Exam getExamById(@PathVariable int id) {
		return examService.getExamById(id);
	}

	@GetMapping(value = ConstantPage.REST_API_GET_ALL_EXAM, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public List<Object> list(@RequestParam("searchKey") String searchKey, @RequestParam("type") String type) {
		List<Object> list = examService.list(searchKey, type);
		return list;
	}

	/*
	 * Linh Gia created by admin: type = 0 created by user: type = 1
	 *
	 */
	@GetMapping(value = ConstantPage.REST_API_GET_PRACTICE, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public List<Object> getListPractice(@RequestParam int user_id) {
		return examService.listPractice(user_id);
	}

	@PostMapping(value = ConstantPage.REST_API_UPDATE_STATUS_EXAM, produces = {
			MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public boolean updateStatus(@RequestParam String data) {
		JSONObject jsonObject = new JSONObject(data);
		int idExam = jsonObject.getInt("exam_id");
		int status = jsonObject.getInt("status");
		try {
			Exam ex = examService.findById(idExam);
			ex.setStatus(status);
			return examService.update(ex);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@PostMapping(value = ConstantPage.REST_API_INSERT_EXAM, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<List<Integer>> insert(@RequestParam("exam") String exam,
			@RequestParam(required = false) MultipartFile file) {
		JSONObject jsonObject = new JSONObject(exam);
		Subject sub = subjectService.findSubjectByName(jsonObject.getString("subject"));
		int questionNum = jsonObject.getInt("question_num");
		List<Question> currentListQuestion = questionService.getListQuestionBySubjectId(sub.getId());
		if (currentListQuestion == null)
			throw new CustomError.GeneralError("Subject không đủ câu hỏi!");
		if (currentListQuestion.size() < questionNum) {
			throw new CustomError.GeneralError("Subject không đủ câu hỏi!");
		} else {
			Exam ex = new Exam();
			ex.setTitle(jsonObject.getString("title"));
			ex.setCode(jsonObject.getString("code"));
			ex.setDecription(jsonObject.getString("description"));
			ex.setTime(jsonObject.getInt("time"));
			ex.setName(jsonObject.getString("name"));
			ex.setSubject(sub);
			ex.setQuestion_num(questionNum);
			ex.setStatus(0);
			ex.setType(0);
			ex.setMax_attempt(jsonObject.getInt("max_attempt"));
			ex.setPercent_passing(jsonObject.getInt("percent_passing"));
			String listGroupId = jsonObject.getString("group_id").trim();
			String listUserId = jsonObject.getString("user_id").trim();
			String userEmail = jsonObject.getString("creator");
			ex.setUsers(usersService.findByEmail(userEmail));
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			try {
				JSONObject date = jsonObject.getJSONObject("date");
				ex.setStart_date(sdf.parse(date.getString("start_date")));
				ex.setEnd_date(sdf.parse(date.getString("end_date")));
			} catch (JSONException e) {
				e.printStackTrace();
			} catch (ParseException e) {
				e.printStackTrace();
			}
			Date date = new Date();
			java.sql.Date sqlDate = new java.sql.Date(date.getTime());
			ex.setCreated_at(sqlDate);
			if (file != null)
				ex.setMedia(uploadService.saveFileVer(file, ConstantPage.PATH_SAVE_EXAM_UPLOAD));
			else
				ex.setMedia("");
			boolean isSuccess = examService.insert(ex);
			// add examId and groupId into exam_group table
			Group group = this.groupService.findGroupByName("RRC");
			Exam_Group eg = new Exam_Group();
			eg.setGroup_id(group.getId());
			eg.setExam_id(ex.getId());
			this.examGroupService.insertExamGroup(eg);
			Exam lastExam = examService.findLastId();
			// thêm exam, group vào exam_group
			examService.InsertObjectInvite(listUserId, "user", lastExam.getId());
			examService.InsertObjectInvite(listGroupId, "group", lastExam.getId());
			List<Integer> examAndSubject = new ArrayList<Integer>();
			examAndSubject.add(lastExam.getId());
			examAndSubject.add(sub.getId());
			return new ResponseEntity<>(examAndSubject, HttpStatus.OK);
		}
	}

	@PostMapping(value = ConstantPage.REST_API_INSERT_PRACTISE, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<Object> insertPractise(@RequestParam("formdata") String practiseExam) {
		JSONObject jsonObject = new JSONObject(practiseExam);
		Exam ex = new Exam();
		ex.setName(jsonObject.getString("nameofpractise").trim());
		ex.setCode(jsonObject.getString("code"));
		ex.setQuestion_num(jsonObject.getInt("numofquestion"));
		String subject = jsonObject.getString("subject");
		List<Question> currentListQuestion = questionService.getListQuestionBySubjectId(Integer.parseInt(subject));
		if (currentListQuestion == null)
			throw new CustomError.GeneralError("Subject không đủ câu hỏi!");
		if (currentListQuestion.size() < jsonObject.getInt("numofquestion")) {
			throw new CustomError.GeneralError("Subject không đủ câu hỏi!");
		} else {
			ex.setMax_attempt(5);
			ex.setTitle("Practice");
			JSONArray select = jsonObject.getJSONArray("detailSelect");
			ex.setSubject(subjectService.findSubjectById(Integer.parseInt(subject)));
			int userId = jsonObject.getInt("creator_id");
			ex.setUsers(usersService.findById(userId));
			ex.setType(1);
			ex.setStatus(1);
			SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
			Date startDate = new Date();
			try {
				ex.setStart_date(formatter.parse(formatter.format(startDate)));
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			int id = examService.insertGetId(ex);
			examService.InsertObjectInvite(userId + "", "user", id);
			for (int i = 0; i < select.length(); i++) {
				JSONObject object = select.getJSONObject(i);
				int chapter = object.getInt("chapter");
				int domain = object.getInt("domain");
				int number = object.getInt("number");
				Exam_Setting exam_Setting = new Exam_Setting(id, chapter, domain, number);
				examSettingService.saveExamSetting(exam_Setting);
			}
			return new ResponseEntity<Object>(id, HttpStatus.OK);
		}

	}

	@PostMapping(value = ConstantPage.REST_API_UPDATE_EXAM, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<Object> update(@RequestParam("exam") String exam, @RequestParam("invite") String invite) {
		JSONObject jsonObject = new JSONObject(exam);
		JSONObject jsonInvite = new JSONObject(invite);
		Subject sub = subjectService.findSubjectByName(jsonObject.getString("subject"));
		int questionNum = jsonObject.getInt("question_num");
		List<Question> currentListQuestion = questionService.getListQuestionBySubjectId(sub.getId());
		if (currentListQuestion == null)
			throw new CustomError.GeneralError("Subject không đủ câu hỏi!");
		if (currentListQuestion.size() < questionNum) {
			throw new CustomError.GeneralError("Subject không đủ câu hỏi!");
		} else {
			Exam ex = examService.findById(jsonObject.getInt("id"));
			ex.setTitle(jsonObject.getString("title").trim());
			ex.setDecription(jsonObject.getString("description").trim());
			ex.setTime(jsonObject.getInt("time"));
			ex.setName(jsonObject.getString("name"));
			ex.setSubject(sub);
			ex.setQuestion_num(questionNum);
			ex.setMax_attempt(jsonObject.getInt("max_attempt"));
			ex.setPercent_passing(jsonObject.getInt("percent_passing"));
			ex.setStatus(0);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			try {
				JSONObject date = jsonObject.getJSONObject("date");
				ex.setStart_date(sdf.parse(date.getString("start_date")));
				ex.setEnd_date(sdf.parse(date.getString("end_date")));
			} catch (JSONException e) {
				e.printStackTrace();
			} catch (ParseException e) {
				e.printStackTrace();
			}
			Date date = new Date();
			java.sql.Date sqlDate = new java.sql.Date(date.getTime());
			ex.setUpdated_at(sqlDate);
			boolean isSuccess = examService.update(ex);
			String deleteUserInvite = jsonInvite.getString("userDelete");
			String deleteGroupInvite = jsonInvite.getString("groupDelete");
			String insertUserInvite = jsonInvite.getString("userInsert");
			String insertGroupInvite = jsonInvite.getString("groupInsert");
			examService.deleteObjectInvite(deleteUserInvite, "user", ex.getId());
			examService.deleteObjectInvite(deleteGroupInvite, "group", ex.getId());
			examService.InsertObjectInvite(insertUserInvite, "user", ex.getId());
			examService.InsertObjectInvite(insertGroupInvite, "group", ex.getId());
			return new ResponseEntity<Object>(isSuccess, HttpStatus.OK);
		}
	}

	@PostMapping(value = ConstantPage.REST_API_UPDATE_FILE_EXAM, produces = {
			MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public ResponseEntity<Object> updateFile(@RequestParam("exam") String exam,
			@RequestParam("file") MultipartFile file, @RequestParam("invite") String invite) {
		JSONObject jsonObject = new JSONObject(exam);
		JSONObject jsonInvite = new JSONObject(invite);
		Subject sub = subjectService.findSubjectByName(jsonObject.getString("subject"));
		int questionNum = jsonObject.getInt("question_num");
		List<Question> currentListQuestion = questionService.getListQuestionBySubjectId(sub.getId());
		if (currentListQuestion == null)
			throw new CustomError.GeneralError("Subject không đủ câu hỏi!");
		if (currentListQuestion.size() < questionNum) {
			throw new CustomError.GeneralError("Subject không đủ câu hỏi!");
		} else {
			Exam ex = examService.findById(jsonObject.getInt("id"));
			ex.setTitle(jsonObject.getString("title"));
			ex.setCode(jsonObject.getString("code"));
			ex.setDecription(jsonObject.getString("description"));
			ex.setTime(jsonObject.getInt("time"));
			ex.setName(jsonObject.getString("name"));
			ex.setSubject(sub);
			ex.setQuestion_num(questionNum);
			ex.setStatus(0);
			ex.setMax_attempt(jsonObject.getInt("max_attempt"));
			ex.setPercent_passing(jsonObject.getInt("percent_passing"));
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			try {
				JSONObject date = jsonObject.getJSONObject("date");
				ex.setStart_date(sdf.parse(date.getString("start_date")));
				ex.setEnd_date(sdf.parse(date.getString("end_date")));
			} catch (JSONException e) {
				e.printStackTrace();
			} catch (ParseException e) {
				e.printStackTrace();
			}
			Date date = new Date();
			java.sql.Date sqlDate = new java.sql.Date(date.getTime());
			ex.setUpdated_at(sqlDate);
			ex.setMedia(uploadService.saveFileVer(file, ConstantPage.PATH_SAVE_EXAM_UPLOAD));
			boolean isSuccess = examService.update(ex);
			String deleteUserInvite = jsonInvite.getString("userDelete");
			String deleteGroupInvite = jsonInvite.getString("groupDelete");
			String insertUserInvite = jsonInvite.getString("userInsert");
			String insertGroupInvite = jsonInvite.getString("groupInsert");
			examService.deleteObjectInvite(deleteUserInvite, "user", ex.getId());
			examService.deleteObjectInvite(deleteGroupInvite, "group", ex.getId());
			examService.InsertObjectInvite(insertUserInvite, "user", ex.getId());
			examService.InsertObjectInvite(insertGroupInvite, "group", ex.getId());
			return new ResponseEntity<Object>(isSuccess, HttpStatus.OK);
		}
	}

	@PostMapping(value = ConstantPage.REST_API_UPDATE_EXAM_SERVICE, produces = {
			MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public Map<String, String> updateExamService(@RequestParam int examId, @RequestParam List<Integer> listQuestion,
			@RequestParam int creatType, @RequestParam(required = false) String listRandom) {
		Map<String, String> map = new HashMap<>();
		Exam exam = examService.findById(examId);
		exam.setCreate_type(creatType);
		examService.update(exam);
		if (listRandom != null) {
			examSettingService.deleteExamSetting(examId);
			JSONObject jsonObject = new JSONObject(listRandom);
			JSONArray select = jsonObject.getJSONArray("detailSelect");
			for (int i = 0; i < select.length(); i++) {
				JSONObject object = select.getJSONObject(i);
				int chapter = object.getInt("chapter");
				int domain = object.getInt("domain");
				int number = object.getInt("number");
				Exam_Setting exam_Setting = new Exam_Setting(examId, chapter, domain, number);
				examSettingService.saveExamSetting(exam_Setting);
			}
		}
		List<Integer> temp = new ArrayList<Integer>();
		List<Integer> temp1 = new ArrayList<Integer>();
		Exam_Question exam_question = new Exam_Question();
		exam_question.setExam_id(examId);
		List<Integer> listIdQuestion = questionService.getListQuestionByExamId(examId);
		// các item sẽ update
		for (Integer id : listIdQuestion) {
			if (!listQuestion.contains(id)) {
				temp.add(id);
			}
		}
		// cac item cần update
		for (Integer id : listQuestion) {
			if (!listIdQuestion.contains(id)) {
				temp1.add(id);
			}
		}
		if (temp1.size() == 0 && temp.size() != 0) {
			for (int i = 0; i < temp.size(); i++) {
				examQuestionService.deleteExamQuestion(temp.get(i), examId);
			}
		} else if (temp1.size() != 0 && temp.size() == 0) {
			for (int i = 0; i < temp1.size(); i++) {
				Exam_Question exam_q = new Exam_Question();
				exam_q.setExam_id(examId);
				exam_q.setQuestion_id(temp1.get(i));
				examQuestionService.saveExamQuestion(exam_q);
			}
		} else {
			if (temp.size() < temp1.size()) {
				for (int i = 0; i < temp.size(); i++) {
					examQuestionService.updateExamQuestion(temp.get(i), temp1.get(i), examId);
				}
				for (int i = temp.size(); i < temp1.size(); i++) {
					Exam_Question exam_q = new Exam_Question();
					exam_q.setExam_id(examId);
					exam_q.setQuestion_id(temp1.get(i));
					examQuestionService.saveExamQuestion(exam_q);
					;
				}
			} else {
				for (int i = 0; i < temp1.size(); i++) {
					examQuestionService.updateExamQuestion(temp.get(i), temp1.get(i), examId);
				}
				for (int i = temp1.size(); i < temp.size(); i++) {
					Exam_Question exam_q = new Exam_Question();
					exam_q.setExam_id(examId);
					exam_q.setQuestion_id(temp.get(i));
					examQuestionService.saveExamQuestion(exam_q);
					;
				}
			}
		}
		map.put("response", "success");
		return map;
	}

	public static String differentNumber(String first, String second) {
		if ("".equals(first))
			return "";
		else if ("".equals(second))
			return first;
		else {
			String result = "";
			String[] numbers = first.split("\\s");
			for (String tem : numbers)
				if (second.indexOf(tem) == -1)
					result += tem;
			return result;
		}

	}

	@PostMapping(value = ConstantPage.REST_API_ADD_EXAMRANDOM, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
	public void addExamRandom(@RequestParam int examId, @RequestParam int idDomain, @RequestParam int idChapter,
			@RequestParam int percentageChapter, @RequestParam int percentageDomain) {
		try {
			Chapter_Exam chapterExam = new Chapter_Exam();
			chapterExam.setChapter_id(idChapter);
			chapterExam.setExam_id(examId);
			chapterExam.setPercentage(percentageChapter);
			examChapterService.saveExamChapter(chapterExam);
			Domain_Exam domain_Exam = new Domain_Exam();
			domain_Exam.setDomain_id(idDomain);
			domain_Exam.setExam_id(examId);
			domain_Exam.setPercentage(percentageDomain);
			examDomainService.saveExamDomain(domain_Exam);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}

	@GetMapping(value = ConstantPage.REST_API_GET_LIST_USER_BY_EXAM_ID)
	@ResponseBody
	public List<Users> listUserExam(@PathVariable int id) {
		return examUserService.getListById(id);
	}

	@GetMapping(value = ConstantPage.REST_API_GET_LIST_GROUP_BY_EXAM_ID)
	public List<Group> listGroupExam(@PathVariable int id) {
		return examGroupService.getListById(id);
	}

	@GetMapping(value = ConstantPage.REST_API_GET_LIST_QUESTION_BY_EXAM_ID)
	public List<Question> listQuestion(@PathVariable int id) {
		List<Integer> listQuestion = examService.getListQuestion(id);
		List<Question> result = new ArrayList<Question>();
		for (Integer s : listQuestion) {
			Question ques = questionService.getQuestionById(s.intValue());
			if (ques != null)
				result.add(ques);
		}

		return result;
	}

	@GetMapping(value = ConstantPage.REST_API_GET_EXAM_BY_EXAM_ID)
	public Exam getExam(@PathVariable int id) {
		return examService.findById(id);
	}

	public static int[] RandomizeArray(int[] array) {
		Random rgen = new Random(); // Random number generator

		for (int i = 0; i < array.length; i++) {
			int randomPosition = rgen.nextInt(array.length);
			int temp = array[i];
			array[i] = array[randomPosition];
			array[randomPosition] = temp;
		}

		return array;
	}

	@GetMapping(value = ConstantPage.REST_API_GET_LIST_EXAMSETTING)
	public List<Object> getListExamSetting(@PathVariable int idExam) {
		List<Object> response = new ArrayList<>();
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
		List<Object> list = examSettingService.listExamSetting(idExam);
		for (Object obj : list) {
			ExamSettingDto data = new ExamSettingDto();
			JSONArray temp = new JSONArray(obj);
			for (int i = 0; i < temp.length(); i++) {
				if (i == 0)
					data.setChapter_id(Integer.parseInt(temp.get(i).toString()));
				else if (i == 1)
					data.setChapterName(temp.get(i).toString());
				else if (i == 2)
					data.setDomain_id(Integer.parseInt(temp.get(i).toString()));
				else if (i == 3)
					data.setDomainName(temp.get(i).toString());
				else
					data.setQuestionNum(Integer.parseInt(temp.get(i).toString()));
			}
			try {
				String json = mapper.writeValueAsString(data);
				response.add(json);
			} catch (JsonProcessingException e) {
				e.printStackTrace();
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return response;
	}

	@GetMapping(value = ConstantPage.REST_API_GET_LIST_EXAMRESULT)
	public List<Exam_Result> getListExamResult(@PathVariable int idExam) {
		return examResultService.listExam_Result(idExam);
	}

	@PostMapping(value = ConstantPage.REST_API_SEARCH_EXAM)
	public List<Object> search(@RequestParam("data") String data) {
		JSONObject jsonObject = new JSONObject(data);
		String key = jsonObject.getString("key");
		String type = jsonObject.getString("type");
		if ("search".equals(type))
			return examService.search(key);
		else
			return examService.filterByType(key);
	}

	@GetMapping(value = "/exam/getQuestionInSubject")
	public List<Integer> getQuestionInSubject(@RequestParam("idSubject") int idSubject,
			@RequestParam("numberQuestion") int numberQuestion) {
		List<Question> currentListQuestion = questionService.getListQuestionBySubjectId(idSubject);
		if (currentListQuestion == null)
			throw new CustomError.GeneralError("Subject không đủ câu hỏi!");
		if (currentListQuestion.size() < numberQuestion) {
			throw new CustomError.GeneralError("Subject không đủ câu hỏi!");
		} else {
			return examResultService.getListQuestionInSubject(idSubject, numberQuestion);
		}
	}

	@GetMapping(value = "/exam/getQuestionInSubject2")
	public List<Question> getQuestionInSubject2(@RequestParam("idSubject") int idSubject,
			@RequestParam("numberQuestion") int numberQuestion) {
		List<Question> obj = examResultService.getListQuestionInSubject2(idSubject, numberQuestion);
		return obj;
	}

	@GetMapping(value = ConstantPage.REST_API_SUM_USER_TEST)
	public Integer sumUserTestExam(@PathVariable int idExam) {
		int sumUser = examService.sumUserTest(idExam);
		return sumUser;
	}

}
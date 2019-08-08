package global.testingsystem.controller;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import global.testingsystem.entity.Answer_Option;
import global.testingsystem.entity.Chapter;
import global.testingsystem.entity.CustomError;
import global.testingsystem.entity.Domain;
import global.testingsystem.entity.Question;
import global.testingsystem.entity.Subject;
import global.testingsystem.service.AnswerService;
import global.testingsystem.service.ChapterService;
import global.testingsystem.service.DomainService;
import global.testingsystem.service.JwtService;
import global.testingsystem.service.QuestionService;
import global.testingsystem.service.SubjectService;
import global.testingsystem.service.UploadFileService;
import global.testingsystem.service.UsersService;
import global.testingsystem.util.ConstantPage;

@CrossOrigin(origins = "*")
@RestController
public class QuestionController{
	private UploadFileService uploadService;
    private ChapterService chapterService;
    private DomainService domainService;
    private UsersService usersService;
    private QuestionService questionService;
    private SubjectService subjectService;
    private AnswerService answerService;
    private ServletContext servletContext;
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private JwtService jwtService;
    @Autowired
	public QuestionController(UploadFileService uploadService, ChapterService chapterService,
			UsersService userService,
			DomainService domainService, QuestionService questionService, SubjectService subjectService,AnswerService answerService, ServletContext servletContext) {
		this.uploadService = uploadService;
		this.chapterService = chapterService;
		this.domainService = domainService;
		this.questionService = questionService;
		this.subjectService = subjectService;
		this.answerService=answerService;
		this.servletContext = servletContext;
		this.usersService=userService;
	}	
    @GetMapping(value = ConstantPage.REST_API_GET_ALL_QUESTION, produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE })
    public List<Question> list() {
    		List<Question> list= questionService.findAllDesc();
    		return list;	
    }
    @GetMapping(value=ConstantPage.REST_API_GET_QUESTION_BY_ID)
    public Question getQuestion(@PathVariable int id) {
    	return questionService.getQuestionById(id);
    }
	@PostMapping(value = ConstantPage.REST_API_INSERT_QUESTION)
	public Map<String,String> addQuestion(@RequestParam String formdata,@RequestParam(required=false) MultipartFile file) {
		Map<String,String> map=new HashMap<>();
		try {
		List<Answer_Option> listAnwer=new ArrayList<>();
		JSONObject response = new JSONObject(formdata);
		String title = response.getString("title").trim();
		String content = response.getString("content").trim();
		String explain = response.getString("explain").trim();
		String media = response.getString("media");
		String code = response.getString("code");
		Integer creator_id=response.getInt("creator_id");
		Integer time =response.getInt("time");
		Date createDate =new Date();
		if(!media.equals("")) media=media.substring(13);
		Question question =new Question(title,code,content,explain,createDate,media,0);
		question.setCreator_id((creator_id));
		question.setTime(time);
		if(file!=null) question.setMedia(uploadService.saveFileVer(file, ConstantPage.PATH_SAVE_QUESTION_UPLOAD));
		String subject = response.getString("subject");
		Subject sb= subjectService.getSubjectById(Integer.parseInt(subject));
		String chapter = response.getString("chapter");
		Chapter cp=chapterService.getChapterById(Integer.parseInt(chapter));
		String domain = response.getString("domain");
		Domain dm=domainService.finDomainById(Integer.parseInt(domain));
		JSONArray anwer = response.getJSONArray("Anwer");
		for (int index = 0; index < anwer.length(); index++) {
			JSONObject temp = anwer.getJSONObject(index);
		    Answer_Option answer=new Answer_Option(temp.getString("content"),temp.getBoolean("isCr"));
		    answer.setQuestion(question);
		    answerService.save(answer);
		}
		question.setSubject(sb);
		question.setDomain(dm);
		question.setChapter(cp);
		dm.setSubject(sb);
		cp.setSubject(sb);
		questionService.saveQuestion(question);
		map.put("response", "success");
		return map;
		}catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
			return null;
		}
	}
	@PostMapping(value=ConstantPage.REST_API_UPDATE_QUESTION)
	public Map<String,String> updateQuestion(@RequestParam String formdata,@RequestParam(required=false) MultipartFile file){
		Map<String,String> map=new HashMap<>();
		System.out.println("update");
		try {
		JSONObject response = new JSONObject(formdata);
		int id=Integer.parseInt(response.getString("id"));
		Question question = questionService.getQuestionById(id);
		Set<Answer_Option> setAnswer=question.getAnswer_Options();
		for(Answer_Option answer: setAnswer) {
			answer.removeQuestion();
		}
		questionService.saveQuestion(question);
		String title = response.getString("title");
		String content = response.getString("content");
		String explantion =response.getString("explain");
		Integer time =response.getInt("time");
		String media = response.getString("media");
		Date updateDate =new Date();
		//media=media.substring(13);
		question.setMedia(media);
		question.setTitle(title);
		question.setTime(time);
		question.setContent(content);
		question.setExplantion(explantion);
		question.setUpdated_at(updateDate);
		if(file!=null) question.setMedia(uploadService.saveFileVer(file,ConstantPage.PATH_SAVE_QUESTION_UPLOAD));
		Integer subject = response.getInt("subjects");
		Subject sb= subjectService.getSubjectById((subject));
		Integer chapter = response.getInt("chapters");
		Chapter cp=chapterService.getChapterById((chapter));
		Integer domain = response.getInt("domains");
		Domain dm=domainService.finDomainById((domain));
		JSONArray anwer = response.getJSONArray("Anwer");
		for (int index = 0; index < anwer.length(); index++) {
			JSONObject temp = anwer.getJSONObject(index);
		    Answer_Option answer=new Answer_Option(temp.getString("content"),temp.getBoolean("isCr"));
		    answer.setQuestion(question);
		    answerService.save(answer);
		}
		question.setSubject(sb);
		question.setDomain(dm);
		question.setChapter(cp);
		dm.setSubject(sb);
		cp.setSubject(sb);
		questionService.saveQuestion(question);
		map.put("response", "success");
		return map;
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return null;
		}
	}
	@PostMapping(value =ConstantPage.REST_API_DELETE_QUESTION)
	public Map<String,String> deleteQuestion(@PathVariable int id){
		Map<String,String> map=new HashMap<>();
		String delete=questionService.deleteQuestion(id);
		map.put("response", delete);
		return map;
		
	}
	
	@GetMapping(value=ConstantPage.REST_API_GET_LIST_QUESTION_OF_SUBJECT)
	public List<Question> getListQuestionOfSubject(@RequestParam int idSubject,@RequestParam List<Integer> listSelected){
		try {
			return questionService.getListQuestionOfSubject(idSubject,listSelected);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}
	@GetMapping(value=ConstantPage.REST_API_GET_LIST_QUESTION_OF_CHAPTER)
	public List<Question> getListQuestionOfChapter(@PathVariable int idChapter,@RequestParam int idSubject){
		try {
			return questionService.getListQuestionOfChapter(idChapter,idSubject);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}
	@GetMapping(value=ConstantPage.REST_API_GET_LIST_QUESTION_OF_EXAM)
	public List<Question> getQuestionByExamId(@PathVariable int examId){
		try {
			return questionService.getQuestionByExamId(examId);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}
	@GetMapping(value=ConstantPage.REST_API_GET_LIST_QUESTION_OF_DOMAIN)
	public List<Question> getListQuestionOfDomain(@PathVariable int idDomain,@RequestParam int idSubject){
		try {
			return questionService.getListQuestionOfDomain(idDomain,idSubject);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}
	@GetMapping(value=ConstantPage.REST_API_GET_LIST_REST_QUESTION)
	public List<Question> getListRestQuestion(@RequestParam int idChapter ,@RequestParam int idDomain,@RequestParam List<Integer> listSelected,
			@RequestParam("key") String key,@RequestParam int idSubject){
		try {
			if(idChapter == 0  && idDomain == 0 && key.equals("")) return questionService.getListRestQuestionListSelect(listSelected,idSubject); 
		    else if(idChapter != 0  && idDomain ==0 && key.equals("")) return questionService.getListRestQuestionChapter(idChapter, listSelected,idSubject);
			else if(idChapter == 0  && idDomain !=0 && key.equals("")) return questionService.getListRestQuestionDomain(idDomain, listSelected,idSubject);
			else if(idChapter == 0  && idDomain ==0 && !key.equals("")) return questionService.getListRestQuestionKey(listSelected, key,idSubject);
			else if(idChapter != 0  && idDomain !=0 && key.equals("")) return questionService.getListRestQuestionDomainChapter(idChapter, idDomain, listSelected,idSubject);
			else if(idChapter != 0  && idDomain ==0 && !key.equals("")) return questionService.getListRestQuestionChapterKey(idChapter, listSelected, key,idSubject);
			else if(idChapter == 0  && idDomain !=0 && !key.equals("")) return questionService.getListRestQuestionDomainKey(idDomain, listSelected, key,idSubject);
			else return questionService.getListRestQuestion(idChapter, idDomain, listSelected,key,idSubject);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}
	@GetMapping(value=ConstantPage.REST_API_GET_LIST_REST_QUESTION_RANDOM)
	public List<Question> getListRestQuestionRandom(@RequestParam int numbeRestQuestion,@RequestParam List<Integer> listSelected,@RequestParam int idSubject){
		try {
			return questionService.getListRestQuestionRandom(numbeRestQuestion,listSelected,idSubject);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}
	
	@PostMapping(value = ConstantPage.REST_API_IMPORT_EXEL )
	public Map<Integer, Object> readExcel(@RequestParam("file") MultipartFile file) {
	    String token = request.getHeader("Token");
	    token=token.substring(5);
	    String username = jwtService.getUsernameFromToken(token);
		Map<Integer, Object> map = new HashMap<>();
	    String pathToSave = uploadService.saveFileVer(file, ConstantPage.PATH_SAVE_EXAM_UPLOAD);
	    String[] formatFile = pathToSave.split("\\.");
	    int len = formatFile.length - 1;
	    if(formatFile[len].equals("xls") || formatFile[len].equals("xlsx")) {
	    List<Question> list = questionService.getAllQuestion();
		    try {
		    	int questionNumber = questionService.readExcel(servletContext.getRealPath(ConstantPage.PATH_SAVE_EXAM_UPLOAD) + "/" + pathToSave, username);
		    	map.put(questionNumber, list);
			} catch (Exception e) {
				throw new CustomError.GeneralError("Trường dữ liệu không đúng theo file mẫu!");
			}
	    return map;
	    } else {
	    	throw new CustomError.GeneralError("File không đúng định dạng. Bạn phải chọn file excel!");
	    }
	}
	
    
    @GetMapping(value = ConstantPage.REST_API_DOWLOAD_EXEL)
    public ResponseEntity<InputStreamResource> download(HttpServletRequest request) throws IOException {
        HttpHeaders responseHeader = new HttpHeaders();
        try {
        String cwd = System.getProperty("user.dir");
        String classPath = cwd + "/" + "upload-dir/question.xlsx";
          File file = ResourceUtils.getFile(classPath);
          byte[] data = FileUtils.readFileToByteArray(file);
          // Set mimeType trả về
          responseHeader.setContentType(MediaType.APPLICATION_OCTET_STREAM);
          // Thiết lập thông tin trả về
          responseHeader.set("Content-disposition", "attachment; filename=" + file.getName());
          responseHeader.setContentLength(data.length);
          InputStream inputStream = new BufferedInputStream(new ByteArrayInputStream(data));
          InputStreamResource inputStreamResource = new InputStreamResource(inputStream);
          return new ResponseEntity<InputStreamResource>(inputStreamResource, responseHeader, HttpStatus.OK);
        } catch (Exception ex) {
          return new ResponseEntity<InputStreamResource>(null, responseHeader, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    
    
    
    
	
	@GetMapping(value=ConstantPage.REST_API_GET_LIST_QUESTION_RANDOM_BY_CHAPTER_DOMIAN)
	public List<Question> getListQuestionRandomByChapTerAndDomain(@RequestParam int subjectId,@RequestParam int domainName,@RequestParam int chapterName,@RequestParam int numberOfQuestion){
		 try {
			 List<Question> responseob = new ArrayList<>();
				List<Object> result = questionService.getListQuestionRandomByChapTerAndDomain(subjectId, domainName,chapterName, numberOfQuestion);
				if(result!=null) {
				for (Object obj1 : result) {
					if (obj1.getClass().isArray() || obj1 != null) {
						List<Object> listobj = new ArrayList<>();
						listobj = Arrays.asList(obj1);
						for (Object obj : listobj) {
							if (obj != null) {
								JSONArray temp = new JSONArray(obj);
								Question question = new Question();
								question = questionService.getQuestionById(Integer.parseInt(temp.get(0).toString()));
								responseob.add(question);
							}
						}
					}
				  }
				}
				return responseob;
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}
	@GetMapping(value=ConstantPage.REST_API_GET_NUMBER_QUESTION_OF_CHAPTER_DOMAIN)
	public List<Object> getNumberQuestionOfChapterAndDomain(@RequestParam int subjectId){
		try {
			return questionService.getNumberQuestionOfChapterAndDomain(subjectId);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}
	@PostMapping(value=ConstantPage.REST_API_SEARCH_QUESTION)
	public List<Question> search(@RequestParam("data") String  data){
		 JSONObject jsonObject = new JSONObject(data);
		   String key= jsonObject.getString("key");
		   return questionService.search(key);
	}
}

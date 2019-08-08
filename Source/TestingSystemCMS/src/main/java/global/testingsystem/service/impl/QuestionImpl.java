package global.testingsystem.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpSession;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import global.testingsystem.entity.Answer_Option;
import global.testingsystem.entity.Chapter;
import global.testingsystem.entity.Domain;
import global.testingsystem.entity.Question;
import global.testingsystem.entity.Subject;
import global.testingsystem.entity.Users;
import global.testingsystem.repository.QuestionReposioty;
import global.testingsystem.service.AnswerService;
import global.testingsystem.service.ChapterService;
import global.testingsystem.service.DomainService;
import global.testingsystem.service.QuestionService;
import global.testingsystem.service.SubjectService;
import global.testingsystem.service.UsersService;
@Service
public class QuestionImpl implements QuestionService {
    @Autowired
    private QuestionReposioty questionRepository;
    @Autowired
    private SubjectService subjectService;
    @Autowired
    private ChapterService chapterService;
    @Autowired
    private DomainService domainService;
    @Autowired
    private AnswerService answerService;
    @Autowired
    private UsersService usersService;
	@Override
	public void saveQuestion(Question question) {
		// TODO Auto-generated method stub
		 questionRepository.save(question);
	}

	@Override
	public Question getQuestionById(int idQuestion) {
		// TODO Auto-generated method stub
		return questionRepository.findById(idQuestion).get();
	}

	@Override
	public List<Question> getAllQuestion() {
		// TODO Auto-generated method stub
		return questionRepository.findAll();
	}

	@Override
	@Transactional
	public String deleteQuestion(int id) {
		// TODO Auto-generated method stub
		try {
			questionRepository.deleteById(id);;
		//	questionRepository.deleteQuestionInExam(id);
			return "success";
		}catch (Exception e) {
			// TODO: handle exception
             e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public List<Question> getListQuestionOfSubject(int idSubject,List<Integer> listSelected) {
		// TODO Auto-generated method stub
		try {
			return questionRepository.getListQuestionOfSubject(idSubject,listSelected);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public List<Question> getListQuestionOfChapter(int idChapter,int idSubject) {
		// TODO Auto-generated method stub
		try {
			return questionRepository.getListQuestionOfChapter(idChapter,idSubject);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public List<Question> getListQuestionOfDomain(int idDomain,int idSubject) {
		// TODO Auto-generated method stub
		try {
			return questionRepository.getListQuestionOfDomain(idDomain,idSubject);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public List<Question> getListRestQuestion(int idChapter, int idDomain, List<Integer> listSelected,String key,int idSubject) {
		// TODO Auto-generated method stub
		try {
			return questionRepository.getListRestQuestion(idChapter, idDomain, listSelected,key,idSubject);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public List<Question> getListRestQuestionChapter(int idChapter, List<Integer> listSelected,int idSubject) {
		// TODO Auto-generated method stub
		try {
			return questionRepository.getListRestQuestionByChapter(idChapter, listSelected,idSubject);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public List<Question> getListRestQuestionDomain(int idDomain, List<Integer> listSelected,int idSubject) {
		// TODO Auto-generated method stub
		try {
			return questionRepository.getListRestQuestionByDomain( idDomain, listSelected,idSubject);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public List<Question> getListRestQuestionKey(List<Integer> listSelected, String key,int idSubject) {
		// TODO Auto-generated method stub
		try {
			return questionRepository.getListRestQuestionByKey(listSelected,key,idSubject);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public List<Question> getListRestQuestionDomainChapter(int idChapter, int idDomain, List<Integer> listSelected,int idSubject) {
		// TODO Auto-generated method stub
		try {
			return questionRepository.getListRestQuestionByChapterDomain(idChapter, idDomain, listSelected,idSubject);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public List<Question> getListRestQuestionDomainKey(int idDomain, List<Integer> listSelected, String key,int idSubject) {
		// TODO Auto-generated method stub
		try {
			return questionRepository.getListRestQuestionByDomainKey(idDomain, listSelected,key,idSubject);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public List<Question> getListRestQuestionChapterKey(int idChapter, List<Integer> listSelected, String key,int idSubject) {
		// TODO Auto-generated method stub
		try {
			return questionRepository.getListRestQuestionByChapterKey(idChapter, listSelected,key,idSubject);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public List<Question> getListRestQuestionListSelect(List<Integer> listSelected,int idSubject) {
		// TODO Auto-generated method stub
		try {
			return questionRepository.getListRestQuestionByListSelect(listSelected,idSubject);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public List<Object> getListQuestionMinimunChapter(int idChapter, int numberOfChapter,List<Integer>listSelected,int idSubject) {
		// TODO Auto-generated method stub
		try {
			return questionRepository.getListQuestionMinimumChapter(idChapter, numberOfChapter,listSelected,idSubject);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}


	@Override
	public List<Question> getListRestQuestionRandom(int numberRestQuestion,List<Integer> listSelected,int idSubject) {
		// TODO Auto-generated method stub
		try {
			return questionRepository.getListQuestionRestRandom(numberRestQuestion,listSelected,idSubject);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public List<Object> getListQuestionMinimumDomain(int idDomain, int numberOfDomain, List<Integer> listSelected,int idSubject) {
		// TODO Auto-generated method stub
		try {
			return questionRepository.getListQuestionMinimumDoamin(idDomain, numberOfDomain,listSelected,idSubject);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public int readExcel(String excelFilePath,String username) {
	    final int COLUMN_INDEX_TITLE = 0;
	    final int COLUMN_INDEX_TIME = 1;
	    final int COLUMN_INDEX_CONTENT = 2;
	    final int COLUMN_INDEX_SUBJECT_ID = 3;
	    final int COLUMN_INDEX_CHAPTER_ID = 4;
	    final int COLUMN_INDEX_DOMAIN_ID = 5;
	    final int COLUMN_INDEX_CORECT = 6;
	    int countQuestion = 0;
		try {
			File file = new File(excelFilePath); 
	        InputStream inputStream = new FileInputStream(file);
//	 
	        //Get workbook
	        Workbook workbook = getWorkbook(inputStream, excelFilePath);
			//get sheet
			Sheet sheet = workbook.getSheetAt(0);
			//abc
			DataFormatter fmt = new DataFormatter();
			//get all row
			Iterator<Row> iterator = sheet.iterator();
			
			Row firstRow = iterator.next();
			Cell firstCell = firstRow.getCell(0);
			Date date = new Date();
            java.sql.Date sqlDate = new java.sql.Date(date.getTime());
            Users users = usersService.findByEmail(username);
			while (iterator.hasNext()) {
				Row currentRow = iterator.next();
				Question question = new Question();
				question.setTitle(currentRow.getCell(COLUMN_INDEX_TITLE).getStringCellValue());
				String getTime = fmt.formatCellValue(currentRow.getCell(COLUMN_INDEX_TIME));
				String regex = "\\d+";
				if(getTime.matches(regex) && Integer.parseInt(getTime) > 0) {					
						question.setTime(Integer.parseInt(getTime));					
				} else {
					continue;
				}
				
				question.setContent(currentRow.getCell(COLUMN_INDEX_CONTENT).getStringCellValue());
				Subject sb = subjectService.findSubjectById(Integer.parseInt(fmt.formatCellValue(currentRow.getCell(COLUMN_INDEX_SUBJECT_ID))));
				if(sb != null) {
					question.setSubject(sb);
				} else {
					continue;
				}
				
				Chapter chapter = chapterService.findChapterById(Integer.parseInt(fmt.formatCellValue(currentRow.getCell(COLUMN_INDEX_CHAPTER_ID))));
				if(chapter != null && chapter.getSubject().equals(sb)){
					question.setChapter(chapter);
				} else {
					continue;
				}
				Domain domain = domainService.finDomainById(Integer.parseInt(fmt.formatCellValue(currentRow.getCell(COLUMN_INDEX_DOMAIN_ID))));
				if(domain != null && chapter.getSubject().equals(sb)) {
					question.setDomain(domain);
				} else {
					continue;
				}
				Random rand = new Random(); 
				int number = rand.nextInt(9999);
				String subjectName = sb.getName();
				String[] strings = subjectName.split(" ");
				String alphabet = "";
		        for(int i = 0; i < strings.length; i++){
		        	alphabet += strings[i].charAt(0);
		        }
		        question.setCode(alphabet.toUpperCase() + number);
				question.setMedia(" ");
				question.setCreated_at(sqlDate);
				question.setCreator_id(users.getId());
				countQuestion ++;
				questionRepository.save(question);	
				String answerCorrect = currentRow.getCell(COLUMN_INDEX_CORECT).getStringCellValue();
				String[] correct = answerCorrect.split("\\,");
				int[] integers = new int[correct.length];
				for (int i = 0; i < integers.length; i++) {
					integers[i] = Integer.parseInt(correct[i]);
				}
				int nextcell = 7;
				int answer = 1;
					while (currentRow.getCell(nextcell) != null) {
						Answer_Option answer_Option = new Answer_Option();
						answer_Option.setCreated_at(sqlDate);
						answer_Option.setQuestion(question);
						answer_Option.setContent(currentRow.getCell(nextcell).getStringCellValue());
						answer_Option.setCorrect(contains(integers, answer));
						answerService.save(answer_Option);
						nextcell++;
						answer++;					
					}				
			}
			file.delete();
		} catch (EncryptedDocumentException e) {
			e.printStackTrace();
		}
			catch (IOException e) {
			e.printStackTrace();
		}
		return countQuestion;
	}
	
	public HttpSession session() {
	    ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder
	          .currentRequestAttributes();
	    return attr.getRequest().getSession(true); // true == allow create
	  }

	 public static boolean contains(final int[] array, final int v) {

	        boolean result = false;

	        for(int i : array){
	            if(i == v){
	                result = true;
	                break;
	            }
	        }

	        return result;
	    }
	
	// Get cell value
		 private static Object getCellValue(Cell cell) {
		        CellType cellType = cell.getCellTypeEnum();
		        Object cellValue = null;
		        switch (cellType) {
		        case BOOLEAN:
		            cellValue = cell.getBooleanCellValue();
		            break;
		        case FORMULA:
		            Workbook workbook = cell.getSheet().getWorkbook();
		            FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
		            cellValue = evaluator.evaluate(cell).getNumberValue();
		            break;
		        case NUMERIC:
		            cellValue = cell.getNumericCellValue();
		            break;
		        case STRING:
		            cellValue = cell.getStringCellValue();
		            break;
		        case _NONE:
		        case BLANK:
		        case ERROR:
		            break;
		        default:
		            break;
		        }
		 
		        return cellValue;
		    }

		// Get Workbook
	    private static Workbook getWorkbook(InputStream inputStream, String excelFilePath) throws IOException {
	        Workbook workbook = null;
	        if (excelFilePath.endsWith("xlsx")) {
	            workbook = new XSSFWorkbook(inputStream);
	        } else if (excelFilePath.endsWith("xls")) {
	            workbook = new HSSFWorkbook(inputStream);
	        } else {
	            throw new IllegalArgumentException("The specified file is not Excel file");
	        }
	 
	        return workbook;
	    }
	public List<Integer> getListQuestionByExamId(int examId) {
		// TODO Auto-generated method stub
		return questionRepository.getListQuestionByExamId(examId);
	}

	@Override
	public List<Question> getQuestionByExamId(int examId) {
		// TODO Auto-generated method stub
		return questionRepository.getQuestionByExamId(examId);
	}

	@Override
	public List<Object> getListQuestionRandomByChapTerAndDomain(int subjectId, int domainName, int chapterName,
			int numberOfQuestion) {
		// TODO Auto-generated method stub
		try {
			return questionRepository.getListQuestionRandomByChapTerAndDomain(subjectId, domainName, chapterName, numberOfQuestion);
		}catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public List<Object> getNumberQuestionOfChapterAndDomain(int subjectId) {
		// TODO Auto-generated method stub
		try {
			return questionRepository.getNumberQuestionOfChapterAndDomain(subjectId);
		}catch (Exception e) {
			// TODO: handle exception
			return null;
		}
	}

	@Override
	public List<Question> getListQuestionBySubjectId(int idSubject) {
	
		return questionRepository.getListQuestionBySubjectId(idSubject);
	}

	@Override
	public List<Question> search(String key) {
		List<Integer> questionIDs=questionRepository.search(key);
		if(questionIDs !=null) {
		List<Question> list= new ArrayList<Question>();
		for(Integer i : questionIDs)list.add(questionRepository.findById(i).get());
		return list;
		}
		else {
			return null;
		}
	}

	@Override
	public List<Question> findAllDesc() {
		// TODO Auto-generated method stub
		try {
			return questionRepository.findAllByOrderByIdDesc();
		}catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
			return null;
		}
	}




}

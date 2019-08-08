package global.testingsystem.service.impl;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import global.testingsystem.entity.Exam;
import global.testingsystem.entity.Group;
import global.testingsystem.entity.Subject;
import global.testingsystem.entity.Users;
import global.testingsystem.repository.ExamRepository;
import global.testingsystem.service.ExamService;
import global.testingsystem.service.SubjectService;
import global.testingsystem.service.UsersService;

@Service
public class ExamServiceImpl implements ExamService {
	
	private ExamRepository examRepository;

	private SubjectService subjectService;
	
	private UsersService usersService;

	@Autowired
	private ExamGroupServiceImpl examGroupService;
	@Autowired
	private ExamUserServiceImpl examUserService;
	@Autowired
	private GroupServiceImpl groupService;
	@Autowired
	private UsersServiceImpl userService;
	
	@Autowired
	public ExamServiceImpl(ExamRepository examRepository, SubjectService subjectService, UsersService usersService) {
		this.examRepository = examRepository;
		this.subjectService = subjectService;
		this.usersService = usersService;
	}

	@Override
	public List<Object> list(String keySearch, String status) {
		try {
		return examRepository.list(keySearch,status);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public boolean delete(int id) {
		examRepository.deleteById(id);
		return true;
	}

	@Override
	public boolean insert(Exam exam) {
		try{
		examRepository.save(exam);
		return true;}
		catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	@Override
	public int insertGetId(Exam exam) {
		examRepository.save(exam);
		examRepository.flush();
		return exam.getId();
	}

	@Override
	public boolean update(Exam exam) {
		try{
			examRepository.save(exam);
			return true;}
			catch(Exception e) {
				e.printStackTrace();
				return false;
			}
	}

	@Override
	public Exam findById(int id) {
		return examRepository.findById(id);
	}

	@Override
	public Exam findLastId() {
		
		return examRepository.findFirstByOrderByIdDesc();
	}

	@Override
	public void deleteObjectInvite(String list, String type,int examId) {
		if("group".equals(type)) {
			if("".compareTo(list)!=0) {
				String[] groups = list.split(",");
				int number;
				for(String gr : groups) {
					try {
					number=Integer.parseInt(gr);
					examGroupService.deleteExamGroup(examId, number);
					}
					catch(Exception e) {
					e.printStackTrace();
				   }

				}
		}
		}
		else {
			if("".compareTo(list)!=0) {
				String[] users = list.split(",");
				int number;
				for(String u : users) {
					try {
					number=Integer.parseInt(u);
					examUserService.deleteExamUser(examId, number);
					}
					catch(Exception e) {
						e.printStackTrace();
					}
				}
				   
				
			}
	}
		}

	@Override
	public boolean InsertObjectInvite(String list, String type, int examId) {
		if("group".equals(type)) {
			if("".compareTo(list)!=0) {
				String[] groups = list.split(",");
				int number;
				for(String gr : groups) {
					try {
					number=Integer.parseInt(gr);
					Group group=groupService.findById(number);
					if(group!=null)
						examGroupService.saveExamGroup(examId,number);
					}
					catch(Exception e) {
						return false;
					}
					
				   }
				return true;
				}
			return true;
		}
		else {
			if("".compareTo(list)!=0) {
				String[] users = list.split(",");
				int number;
				for(String u : users) {
					try {
					number=Integer.parseInt(u);
					Users user=userService.findById(number);
					if(user!=null)examUserService.saveExamUser(examId,number);
					}
					catch(Exception e) {
						return false;
					}
					
				   }
				return true;
				}
			return true;
		}
	}
// MR DUC
	@Override
	public List<Object> listPracticeHomepage() {
		return examRepository.listPracticeHomepage();
	}
	@Override
	public void readExcel(String excelFilePath) {
		final int COLUMN_INDEX_NAME = 0;
	    final int COLUMN_INDEX_TITLE = 1;
	    final int COLUMN_INDEX_CODE = 2;
	    final int COLUMN_INDEX_DECRIPTION = 3;
	    final int COLUMN_INDEX_MEDIA = 4;
	    final int COLUMN_INDEX_START_DATE = 5;
	    final int COLUMN_INDEX_END_DATE = 6;
	    final int COLUMN_INDEX_TIME = 7;
	    final int COLUMN_INDEX_CREATED_AT = 8;
	    final int COLUMN_INDEX_UPDATED_AT = 9;
	    final int COLUMN_INDEX_CREATE_TYPE = 10;
	    final int COLUMN_INDEX_PERCENT_PASSING = 11;
	    final int COLUMN_INDEX_MAX_ATTEMPT = 12;
	    final int COLUMN_INDEX_STATUS = 13;
	    final int COLUMN_INDEX_QUESTION_NUM = 14;
	    final int COLUMN_INDEX_TYPE = 15;
	    final int COLUMN_INDEX_CREATOR_ID = 16;
	    final int COLUMN_INDEX_SUBJECT_ID = 17;
		try {

	        InputStream inputStream = new FileInputStream(new File(excelFilePath));
//	 
	        //Get workbook
	        Workbook workbook = getWorkbook(inputStream, excelFilePath);
			//get sheet
			Sheet sheet = workbook.getSheetAt(0);
			//get all row
			Iterator<Row> iterator = sheet.iterator();
			while (iterator.hasNext()) {
				Row nextRow = (Row) iterator.next();
				if(nextRow.getRowNum() == 0) {
					continue;
				}
				//Gets all cell
				Iterator<Cell> cellIterator = nextRow.cellIterator();
				// Read cells and set value for book object
				Exam exam = new Exam();
				while (cellIterator.hasNext()) {
					//Read cell
					Cell cell = (Cell) cellIterator.next();
					Object cellValue =  getCellValue(cell);
					if (cellValue == null || cellValue.toString().isEmpty()) {
	                    continue;
	                }
					SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
					int columnIndex = cell.getColumnIndex();
					switch (columnIndex) {
					case COLUMN_INDEX_NAME:
						exam.setName((String) getCellValue(cell));
						break;
					case COLUMN_INDEX_TITLE:
						exam.setTitle((String) getCellValue(cell));;
						break;
					case COLUMN_INDEX_CODE:
						exam.setCode((String) getCellValue(cell));
						break;
					case COLUMN_INDEX_DECRIPTION:
						exam.setDecription((String) getCellValue(cell));
						break;
					case COLUMN_INDEX_MEDIA:
						exam.setMedia((String) getCellValue(cell));
						break;
					case COLUMN_INDEX_START_DATE:
						try {
							exam.setStart_date(formatter.parse((String)getCellValue(cell)));
						} catch (ParseException e) {
							e.printStackTrace();
						}
						break;
					case COLUMN_INDEX_END_DATE:
						try {
							exam.setEnd_date(formatter.parse((String)getCellValue(cell)));
						} catch (ParseException e) {
							e.printStackTrace();
						}
						break;
					case COLUMN_INDEX_TIME:
						exam.setTime(new BigDecimal((Double) cellValue).intValue());
						break;
					case COLUMN_INDEX_CREATED_AT:
						try {
							exam.setCreated_at(formatter.parse((String)getCellValue(cell)));
						} catch (ParseException e) {
							e.printStackTrace();
						}
						break;
					case COLUMN_INDEX_UPDATED_AT:			
						try {
							exam.setUpdated_at(formatter.parse((String)getCellValue(cell)));
						} catch (ParseException e) {
							e.printStackTrace();
						}
						break;
					case COLUMN_INDEX_CREATE_TYPE:
						exam.setCreate_type(Integer.parseInt((String) getCellValue(cell)));
						break;
					case COLUMN_INDEX_PERCENT_PASSING:
						exam.setPercent_passing(Integer.parseInt((String) getCellValue(cell)));
						break;
					case COLUMN_INDEX_MAX_ATTEMPT:
						exam.setMax_attempt(Integer.parseInt((String) getCellValue(cell)));
						break;
					case COLUMN_INDEX_STATUS:
						exam.setStatus(Integer.parseInt((String) getCellValue(cell)));
						break;
					case COLUMN_INDEX_QUESTION_NUM:
						exam.setQuestion_num(Integer.parseInt((String) getCellValue(cell)));
						break;
					case COLUMN_INDEX_TYPE:
						exam.setType(Integer.parseInt((String) getCellValue(cell)));
						break;
					case COLUMN_INDEX_CREATOR_ID:
						Users us = usersService.findById(Integer.parseInt((String) getCellValue(cell)));
						exam.setUsers(us);
						break;
					case COLUMN_INDEX_SUBJECT_ID:
						Subject sb = subjectService.findSubjectById(Integer.parseInt((String) getCellValue(cell)));
						exam.setSubject(sb);;
						break;
					default:
						break;
					}
				}
				examRepository.save(exam);
			}
			
		} catch (EncryptedDocumentException e) {
			e.printStackTrace();
		}
			catch (IOException e) {
			e.printStackTrace();
		}
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

	@Override
	public List<Object> listPractice(int user_id) {
//		return null;
		return examRepository.getListPractice(user_id);
	}
	public Exam getExamById(int id) {
		// TODO Auto-generated method stub
		try {
		return examRepository.findById(id);
		} catch(Exception e ) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<Integer> getListQuestion(int id) {
		
		return examRepository.getListQuestion(id);
	}

	@Override
	public Object getExamByIDS(int id) {
		return examRepository.getExamByIDS(id);
	}

	@Override
	public Object getExamByCode(String code) {
		return examRepository.getExamByCode(code);
	}

	@Override
	public List<Object> search(String key) {
		
		return examRepository.search(key);
	}

	@Override
	public List<Object> filterByType(String type) {
		
		return examRepository.filterByType(type);
	}

	@Override
	public Integer sumUserTest(int id) {
		return examRepository.sumUserTest(id);
	}

}
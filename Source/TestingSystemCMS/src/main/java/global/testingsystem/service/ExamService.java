package global.testingsystem.service;

import java.util.List;

import global.testingsystem.entity.Exam;

public interface ExamService {
	List<Object> list(String keySearch, String status);
	// Mr Duc
	List<Object> listPracticeHomepage();
	Object getExamByIDS(int id);
	// Mr Duc
	boolean delete(int id);
    Exam getExamById(int id);
	boolean insert(Exam exam);
	int insertGetId(Exam exam);
	boolean update(Exam exam);
	
	Exam findById(int id);
	
	Exam findLastId();

	List<Object> listPractice(int user_id); // Practice: example with type=1

	void readExcel(String excelFilePath);
	void deleteObjectInvite (String list,String type,int examId);

	boolean InsertObjectInvite(String list, String type, int examId);

	
	List<Integer> getListQuestion(int id);
    
	Object getExamByCode(String code);
	
	List<Object> search(String key);
	
	List<Object> filterByType(String type);
	
	Integer sumUserTest(int id);
}

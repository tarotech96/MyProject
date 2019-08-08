package global.testingsystem.service;

import java.util.List;

import global.testingsystem.entity.Question;


public interface QuestionService {
	List<Question> findAllDesc();
   void saveQuestion(Question question);
   Question getQuestionById(int idQuestion);
   List<Question> getAllQuestion();
   String deleteQuestion(int id);
   
   List<Question> getListQuestionOfSubject(int idSubject,List<Integer> listSelected);
   List<Question> getListQuestionOfChapter(int idChapter,int idSubject);
   List<Question> getListQuestionOfDomain(int idDomain,int idSubject);
   List<Question> getListRestQuestion(int idChapter,int idDomain,List<Integer> listSelected,String key,int idSubject);
   List<Question> getListRestQuestionChapter(int idChapter,List<Integer> listSelected,int idSubject);
   List<Question> getListRestQuestionDomain(int idDomain,List<Integer> listSelected,int idSubject);
   List<Question> getListRestQuestionKey(List<Integer> listSelected,String key,int idSubject);
   List<Question> getListRestQuestionDomainChapter(int idChapter,int idDomain,List<Integer> listSelected,int idSubject);
   List<Question> getListRestQuestionDomainKey(int idDomain,List<Integer> listSelected,String key,int idSubject);
   List<Question> getListRestQuestionChapterKey(int idChapter,List<Integer> listSelected,String key,int idSubject);
   List<Question> getListRestQuestionListSelect(List<Integer> listSelected,int idSubject);
   List<Object> getListQuestionMinimunChapter(int idChapter,int numberOfChapter,List<Integer> listSelected,int idSubject);
   List<Object> getListQuestionMinimumDomain(int idDomain,int numberOfDomain,List<Integer> listSelected,int idSubject);
   List<Question> getListRestQuestionRandom(int numberResQuestion,List<Integer> listSelected,int idSubject);
   List<Object> getListQuestionRandomByChapTerAndDomain(int subjectId,int domainName,int chapterName,int numberOfQuestion);
   List<Object> getNumberQuestionOfChapterAndDomain(int subjectId);
   
   int readExcel(String excelFilePath, String username);
   List<Integer> getListQuestionByExamId(int examId);
   List<Question> getQuestionByExamId(int examId);
   List<Question> getListQuestionBySubjectId(int idSubject);
   List<Question> search(String key);
}

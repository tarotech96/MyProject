/**
 * 
 */
package global.testingsystem.service;

import java.util.List;

import global.testingsystem.entity.Chapter;

/**
 * @author USER
 *
 */
public interface ChapterService {
    List<Object> getListChapter();
    
    List<Chapter> listChapter();
    
    boolean editChapter(Chapter chapter);
    
    boolean addChapter(Chapter chapter);
    
    boolean deleteChapter(int id);
    
    Chapter findChapterById(int id);
    
    List<Object> searchChapterByName(String name);
    
    Chapter findChapterByName(String name);
    
    List<Chapter> sortChapterByName(String name);
    //TU ***************************************************
    String saveChapter(Chapter chapter);
    Chapter getChapterById(int chapterId);
    
    List<Chapter> getListChapterBySubject(int idSubject);
    
    List<Chapter> getListChapterBySubjectAndParent(int idSubject);
    
    List<Chapter> getListChapterByName(String name);
    
    List<Integer> getAllSubId(int parentId);
    
    List<Integer> getListChapterIdBySubjectId(int subjectId);
}

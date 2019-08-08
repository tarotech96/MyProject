/**
 * 
 */
package global.testingsystem.service;

import java.util.List;

import global.testingsystem.entity.Subject;

/**
 * @author USER
 *
 */
public interface SubjectService {
     List<Subject> getListSubject();
     
     boolean editSubject(Subject subject);
     
     boolean addSubject(Subject subject);
     
     boolean deleteSubject(int id);
     
     Subject findSubjectById(int id);
     
     Subject findSubjectByName(String name);
     
     List<Subject> searchByName(String name);
     
     List<Subject> sortSubjectByName(String name);
     String saveSubject(Subject sb);
     Subject getSubjectById(int idSubject);
     List<Subject> getAllSubject();

}

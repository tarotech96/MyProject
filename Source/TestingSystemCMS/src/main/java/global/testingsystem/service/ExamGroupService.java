/**
 * 
 */
package global.testingsystem.service;

import java.util.List;

import global.testingsystem.entity.Group;

/**
 * @author USER
 *
 */
public interface ExamGroupService {
	void saveExamGroup(int exam , int group);
	List <Group> getListById(int id);
	void deleteExamGroup(int examId, int groupId);
}

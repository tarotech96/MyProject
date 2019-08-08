/**
 * 
 */
package global.testingsystem.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import global.testingsystem.entity.Exam_Group;
import global.testingsystem.entity.Group;
import global.testingsystem.repository.ExamGroupRepository;
import global.testingsystem.repository.GroupRepository;
import global.testingsystem.service.ExamGroupService;

/**
 * @author USER
 *
 */
@Service
public class ExamGroupServiceImpl implements ExamGroupService {

	@Autowired
	private ExamGroupRepository examGroupRepo;
	@Autowired private GroupRepository groupRepo;
	@Override
	public void saveExamGroup(int exam, int group) {
		Exam_Group eg=new Exam_Group();
		eg.setExam_id(exam);
		eg.setGroup_id(group);
		examGroupRepo.save(eg);
	}
	@Override
	public List<Group> getListById(int id) {
		return groupRepo.findByExamId(id);
	}
	@Override
	@Transactional
	public void deleteExamGroup(int examId, int groupId) {
		 examGroupRepo.deleteExamGroup(examId, groupId);
	}
	
}



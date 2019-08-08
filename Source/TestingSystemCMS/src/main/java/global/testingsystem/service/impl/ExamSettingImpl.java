package global.testingsystem.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import global.testingsystem.entity.Exam_Setting;
import global.testingsystem.repository.ExamSettingRepository;
import global.testingsystem.service.ExamSettingService;

@Service
public class ExamSettingImpl implements ExamSettingService {
	@Autowired
	private ExamSettingRepository examSettingRepo;
	@Override
	public Exam_Setting saveExamSetting(Exam_Setting exam_Setting) {
		try {
			examSettingRepo.save(exam_Setting);
			return exam_Setting;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	@Override
	public List<Object> listExamSetting(int examId) {
		// TODO Auto-generated method stub
		try {
			return examSettingRepo.getListExamSetting(examId);
		}catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
			return null;
		}
	}
	@Transactional
	@Override
	public void deleteExamSetting(int examId) {
		// TODO Auto-generated method stub
		try {
			examSettingRepo.deleteExamSetting(examId);
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
	}

}

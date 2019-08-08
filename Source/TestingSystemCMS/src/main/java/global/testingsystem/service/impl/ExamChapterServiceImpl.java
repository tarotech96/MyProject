package global.testingsystem.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import global.testingsystem.entity.Chapter_Exam;
import global.testingsystem.repository.ExamChapterRepository;
import global.testingsystem.service.ExamChapterService;
@Service
public class ExamChapterServiceImpl implements ExamChapterService {
    @Autowired
    private ExamChapterRepository examChapterRepo;
	@Override
	public void saveExamChapter(Chapter_Exam chapter_Exam) {
		// TODO Auto-generated method stub
		examChapterRepo.save(chapter_Exam);	
	}

}

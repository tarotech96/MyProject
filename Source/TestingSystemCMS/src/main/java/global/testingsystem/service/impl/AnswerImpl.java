package global.testingsystem.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import global.testingsystem.entity.Answer_Option;
import global.testingsystem.repository.AnswerRepository;
import global.testingsystem.service.AnswerService;


@Service
public class AnswerImpl implements AnswerService {
    @Autowired
    private AnswerRepository answerRepo;
	@Override
	public void save(Answer_Option answer_Option) {
		// TODO Auto-generated method stub
		answerRepo.save(answer_Option);
		
	}
}

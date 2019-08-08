package global.testingsystem.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import global.testingsystem.entity.Domain_Exam;
import global.testingsystem.repository.ExamDomainRepository;
import global.testingsystem.service.ExamDomainService;
@Service
public class ExamDomainServiceImpl implements ExamDomainService {
    @Autowired
    private ExamDomainRepository examDomainRepo;
	@Override
	public void saveExamDomain(Domain_Exam domain_exam) {
		// TODO Auto-generated method stub
		examDomainRepo.save(domain_exam);
	}

}

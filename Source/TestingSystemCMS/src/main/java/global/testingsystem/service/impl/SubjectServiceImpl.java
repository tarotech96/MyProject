/**
 * 
 */
package global.testingsystem.service.impl;

import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import global.testingsystem.entity.Subject;
import global.testingsystem.repository.SubjectRepository;
import global.testingsystem.service.SubjectService;

/**
 * @author admin
 *
 */
@Service
public class SubjectServiceImpl implements SubjectService{

        @Autowired
        private SubjectRepository subjectRepo;
        @Override
        public List<Subject> getListSubject() {
                // TODO Auto-generated method stub
                return subjectRepo.list();
        }

        @Override
        public boolean editSubject(Subject subject) {
                // TODO Auto-generated method stub
                 subjectRepo.save(subject);
                 return true;
        }

        @Override
        public boolean addSubject(Subject subject) {
                // TODO Auto-generated method stub
                subjectRepo.save(subject);
                return true;
        }

        @Override
        public boolean deleteSubject(int id) {
                // TODO Auto-generated method stub
                subjectRepo.deleteById(id);
                return true;
        }

       
        @Override
        public List<Subject> searchByName(String name) {
                // TODO Auto-generated method stub
                try {
                        List<Subject> result = new LinkedList<Subject>();
                        List<Subject> listAll = subjectRepo.findAll();
                        if (name == null && "".equals(name) ) {
                                return listAll;
                        }else {
                                for (Subject subject : listAll) {
                                        if (subject.getName().toLowerCase().contains(name.toLowerCase())) {
                                                result.add(subject);
                                        }
                                }
                        }
                        return result;
                } catch (Exception e) {
                        // TODO: handle exception
                        return new LinkedList<Subject>();
                }
        }

        @Override
        public Subject findSubjectByName(String name) {
            // TODO Auto-generated method stub
            return subjectRepo.findSubjectByName(name);
        }

        @Override
        public Subject findSubjectById(int id) {
        	try {
        		return subjectRepo.findById(id).get();
			} catch (Exception e) {
				return null;
			}
            
        }

        @Override
        public List<Subject> sortSubjectByName(String name) {
                // TODO Auto-generated method stub
                List<Subject> list = subjectRepo.findAll();
                try {
                        if ("DESC".equals(name)) {
                                list.sort(Comparator.comparing(Subject:: getName));
                        }else {
                                list.sort(Comparator.comparing(Subject:: getName).reversed());
                        }
                } catch (Exception e) {
                        // TODO: handle exception
                        return new LinkedList<Subject>();
                }
                return list;
        }

       // Tu ***************************************************
        @Override
    	public Subject getSubjectById(int idSubject) {
    		// TODO Auto-generated method stub
    		return subjectRepo.findById(idSubject).get();
    	}

    	@Override
    	public String saveSubject(Subject sb) {
    		// TODO Auto-generated method stub
    		try {
    			subjectRepo.save(sb);
    			return "success";
    		}catch (Exception e) {
    			// TODO: handle exception
    			return null;
    		}
    	}

    	@Override
    	public List<Subject> getAllSubject() {
    		// TODO Auto-generated method stub
    		return subjectRepo.findAll();
    	}
    	 // Tu ***************************************************

}

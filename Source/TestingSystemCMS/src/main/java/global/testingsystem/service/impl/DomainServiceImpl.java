/**
 * 
 */
package global.testingsystem.service.impl;

import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import global.testingsystem.entity.Domain;
import global.testingsystem.repository.DomainRepository;
import global.testingsystem.service.DomainService;

/**
 * @author USER
 *
 */
@Service
public class DomainServiceImpl implements DomainService {

        @Autowired
        private DomainRepository domainRepo;

        @Override
        public List<Object> getListDomain() {
                // TODO Auto-generated method stub
                return domainRepo.findAllDomain();
        }

        @Override
        public boolean editDomain(Domain domain) {
                // TODO Auto-generated method stub
                domainRepo.save(domain);
                return true;
        }

        @Override
        public boolean addDomain(Domain domain) {
                // TODO Auto-generated method stub
                domainRepo.save(domain);
                return true;
        }

        @Override
        public boolean deleteDomain(int id) {
                // TODO Auto-generated method stub
                domainRepo.deleteById(id);
                return true;
        }

        @Override
        public List<Object> searchDomainByName(String name) {
                // TODO Auto-generated method stub
           return domainRepo.searchDomainByName(name);
        }

        @Override
        public Domain findDomainByName(String name) {
                // TODO Auto-generated method stub
                return domainRepo.findDomainByName(name);
        }

        @Override
        public Domain finDomainById(int id) {
                // TODO Auto-generated method stub
        	try {
                return domainRepo.findById(id).get();
        	}catch (Exception e) {
				// TODO: handle exception
        		return null;
			}
        }

        @Override
        public List<Domain> sortDomainByName(String name) {
                // TODO Auto-generated method stub
                List<Domain> listDomain = domainRepo.findAll();
                try {
                        if ("DESC".equals(name)) {
                                listDomain.sort(Comparator.comparing(Domain:: getName));
                        }else {
                                listDomain.sort(Comparator.comparing(Domain:: getName).reversed());
                        }
                } catch (Exception e) {
                        // TODO: handle exception
                        return new LinkedList<Domain>();
                }
                return listDomain;
        }
        @Override
		public List<Domain> getListDomainBySubject(int idSubject) {
			// TODO Auto-generated method stub
			try {
				return domainRepo.getDomainBySubject(idSubject);
			}catch (Exception e) {
				// TODO: handle exception
				return null;
			}
		}

		@Override
		public List<Domain> getListDomainByName(String name) {
			return domainRepo.getListDomainByName(name);
		}

		@Override
		public List<Integer> getListDomainIdBySubjectId(int subjectId) {
			return domainRepo.getListDomainIdBySubjectId(subjectId);
		}

}

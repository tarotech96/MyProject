/**
 * 
 */
package global.testingsystem.service.impl;

import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import global.testingsystem.entity.Chapter;
import global.testingsystem.repository.ChapterRepository;
import global.testingsystem.service.ChapterService;

/**
 * @author USER
 *
 */
@Service
public class ChapterServiceImpl implements ChapterService {

        @Autowired
        private ChapterRepository chapterRepo;

        @Override
        public List<Object> getListChapter() {
                // TODO Auto-generated method stub
                return chapterRepo.list();
        }

        @Override
        public List<Chapter> listChapter(){
        	return chapterRepo.getParentName();
        }
        
        @Override
        public boolean editChapter(Chapter chapter) {
                // TODO Auto-generated method stub
                chapterRepo.save(chapter);
                return true;
        }

        @Override
        public boolean addChapter(Chapter chapter) {
                // TODO Auto-generated method stub
                chapterRepo.save(chapter);
                return true;
        }

        @Override
        public List<Object> searchChapterByName(String name) {
                // TODO Auto-generated method stub
              return chapterRepo.searchChapterByName(name);
        }

        @Override
        public Chapter findChapterByName(String name) {
                // TODO Auto-generated method stub
                return chapterRepo.findChapterByName(name);
        }

        @Override
        public boolean deleteChapter(int id) {
                // TODO Auto-generated method stub
                chapterRepo.deleteById(id);
                return true;
        }

        @Override
        public Chapter findChapterById(int id) {
                // TODO Auto-generated method stub
        	    try {
                return chapterRepo.findById(id).get();
        	    }catch (Exception e) {
					// TODO: handle exception
        	    	return null;
				}
        }

        @Override
        public List<Chapter> sortChapterByName(String name) {
                // TODO Auto-generated method stub
                List<Chapter> listChapter = chapterRepo.findAll();
                try {
                        if ("DESC".equals(name)) {
                                listChapter.sort(Comparator.comparing(Chapter:: getName));
                        }else {
                                listChapter.sort(Comparator.comparing(Chapter:: getName).reversed());
                        }
                } catch (Exception e) {
                        // TODO: handle exception
                        return new LinkedList<Chapter>();
                }
                return listChapter;
        }
//TU ********************************************************************
        
        @Override
    	public String saveChapter(Chapter chapter) {
    		// TODO Auto-generated method stub
    		try{
    		   chapterRepo.save(chapter);
    		   return "success";
    		}catch (Exception e) {
    			// TODO: handle exception
    			return null;
    		}
    	}

    	@Override
    	public Chapter getChapterById(int chapterId) {
    		return chapterRepo.findById(chapterId).get();
    	}
    	//TU ********************************************************************
    	
    	
    	@Override
		public List<Chapter> getListChapterBySubject(int idSubject) {
			// TODO Auto-generated method stub
			try{
	    		  return chapterRepo.getChapterBySubject(idSubject);
	    		}catch (Exception e) {
	    			// TODO: handle exception
	    			return null;
	    		}
		}

		@Override
		public List<Chapter> getListChapterBySubjectAndParent(int idSubject) {
			// TODO Auto-generated method stub
			return chapterRepo.getChapterBySubjectAndParent(idSubject);
		}

		@Override
		public List<Chapter> getListChapterByName(String name) {
			return chapterRepo.getListChapterByName(name);
		}

		@Override
		public List<Integer> getAllSubId(int parentId) {
			return chapterRepo.getAllSubId(parentId);
		}

		@Override
		public List<Integer> getListChapterIdBySubjectId(int subjectId) {
			return chapterRepo.getListChapterIdBySubjectId(subjectId);
		}

}

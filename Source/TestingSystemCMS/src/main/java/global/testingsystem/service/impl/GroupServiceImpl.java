package global.testingsystem.service.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Iterator;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import global.testingsystem.dto.ListUserGroupDTO;
import global.testingsystem.dto.UserDTO;
import global.testingsystem.entity.Group;
import global.testingsystem.entity.User_Group;
import global.testingsystem.entity.Users;
import global.testingsystem.repository.GroupRepository;
import global.testingsystem.repository.UserGroupRepository;
import global.testingsystem.service.GroupService;

@Service
public class GroupServiceImpl implements GroupService {
        private static Logger log = Logger.getLogger(GroupServiceImpl.class);
        @Autowired
        private GroupRepository groupRepository;
        @Autowired
        private UserGroupRepository userGroupRepository;
        @Override
        public List<Group> list() {
                List<Group> group = groupRepository.findAll();
                return group;
        }

        @Override
        public Boolean insert(Group group) {
                Group g = groupRepository.save(group);
                if (g != null)
                        return true;
                else {
                        log.error("Insert false ");
                        return false;
                }
        }

        @Override
        public Boolean update(Group group) {
                Group g = groupRepository.save(group);
                if (g != null)
                        return true;
                else {
                        log.error("Update false ");
                        return false;
                }
        }

        @Override
        public Boolean delete(int id) {

                try {
                        groupRepository.deleteById(id);
                        return true;
                } catch (Exception e) {
                        log.error("Delete false ");
                        return false;
                }

        }

        @Override
        public List<Object> searchGroupByName(String name) {
                // TODO Auto-generated method stub
           return groupRepository.searchGroupByName(name);
        }

        @Override
        public Group findGroupByName(String name) {
                return groupRepository.findGroupByName(name);
        }

        @Override
        public Group findById(int id) {
                // TODO Auto-generated method stub
                return groupRepository.getOne(id);
        }

        @Override
        public List<Group> sortGroupByName(String name) {
                // TODO Auto-generated method stub
                List<Group> listGroup = groupRepository.findAll();
                try {
                        if ("DESC".equals(name)) {
                                listGroup.sort(Comparator.comparing(Group:: getName));
                        }else {
                                listGroup.sort(Comparator.comparing(Group:: getName));
                        }
                } catch (Exception e) {
                        // TODO: handle exception
                }
                return listGroup;
        }

		@Override
		public List<Object> getlistGroup() {
			// TODO Auto-generated method stub
			return groupRepository.getListGroup();
		}

		@Override
		public List<Integer> getAllParentId() {
			// TODO Auto-generated method stub
			return groupRepository.getAllParentId();
		}

		@Override
		public List<Integer> getAllSubId(int parentId) {
			return groupRepository.getAllSubId(parentId);
		}

		@Override
		public ListUserGroupDTO listUser(int idGroup,String keySearch) {
			Group gr = groupRepository.findById(idGroup).get();
			List<UserDTO> listUser = new ArrayList<UserDTO>();
			List<UserDTO> listNotUser = new ArrayList<UserDTO>();
			try {
			List<Object> listUserObject = groupRepository.listMember(idGroup,keySearch);
			List<Object> listNotMember= groupRepository.listNotMember(idGroup);
			
			 for(Iterator<Object> it = listUserObject.iterator(); it.hasNext();) {
		  	    	Object[] object = (Object[]) it.next();
		  	    	listUser.add(new UserDTO((Integer)object[0],(String) object[1], (String)object[2]));
			 }
			 for(Iterator<Object> it = listNotMember.iterator(); it.hasNext();) {
		  	    	Object[] object = (Object[]) it.next();
		  	    	listNotUser.add(new UserDTO((Integer)object[0],(String) object[1], (String)object[2]));
			 }
				 
				 
			} 
			catch(Exception e) {
				e.printStackTrace();
			}
			return new ListUserGroupDTO(gr.getId(), gr.getName(), listUser,listNotUser);
		}

		@Override
		@Transactional
		public ListUserGroupDTO addUserGroup(int idGroup, String listUser, String keySeacrh) {
             String[] listIdUser=listUser.split(",");
             try {
			for(String s : listIdUser) {
				userGroupRepository.insert(idGroup,Integer.parseInt(s));
			}
             }catch(Exception e) {
            	 e.printStackTrace();
             }
			return this.listUser(idGroup,keySeacrh);
		}

		@Override
		@Transactional
		public ListUserGroupDTO removeUserGroup(int idGroup, int idUser,String keySeacrh) {
			userGroupRepository.delete(idGroup,idUser);
			return this.listUser(idGroup,keySeacrh);
		}

}
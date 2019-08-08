package global.testingsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import global.testingsystem.entity.User_Group;

public interface UserGroupRepository extends JpaRepository<User_Group, Integer> {
	   @Modifying
	   @Query(value = "insert into user_group (group_id,user_id) value (:group_id,:user_id) ", nativeQuery = true)
        void insert(@Param("group_id") int groupId,@Param("user_id") int userId);
	   
	   @Modifying
	   @Query(value = "delete from user_group where group_id=:group_id and user_id=:user_id", nativeQuery = true)
        void delete(@Param("group_id") int groupId,@Param("user_id") int userId);
}

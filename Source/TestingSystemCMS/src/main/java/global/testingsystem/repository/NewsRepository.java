/**
 * 
 */
package global.testingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import global.testingsystem.entity.News;

/**
 * @author User
 *
 */
@Repository
public interface NewsRepository extends JpaRepository<News, Integer> {
	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param keyword
	 * @return
	 */
	@Query(value = "select * from news where news.content LIKE CONCAT('%',:key,'%') or news.title LIKE CONCAT('%',:key,'%') or news.the_description LIKE CONCAT('%',:key,'%') or news.up_status LIKE CONCAT('%',:key,'%') ORDER BY id DESC;", nativeQuery = true)
	public List<News> searchAllNewsCMS(@Param("key") String key);
//	public List<News> findAllByOrderByconfirmDateDesc();
	@Query(value = "select * from news where news.content LIKE CONCAT('%',:content,'%') and news.active_status = 1 and news.up_status = 'approve'", nativeQuery = true)
	public List<News> searchNewsByContent(@Param("content") String content);
	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param keyword
	 * @return
	 */
	@Query(value = "select * from news where news.title LIKE CONCAT('%',:title,'%') and news.active_status = 1 and news.up_status = 'approve'", nativeQuery = true)
	public List<News> searchNewsByTitle(@Param("title") String title);
	/** 
	 * @author ndduc 
	 * @created date Dec 12, 2018 
	 * @modified date Dec 12, 2018 
	 * @version 1.0 
	 * @description 
	 * @param keyword
	 * @return
	 */
//	public List<News> findByConfirmDateContaining();
	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param keyword
	 * @return
	 */
	@Query(value = "select * from news where news.the_description LIKE CONCAT('%',:the_description,'%') and news.active_status = 1 and news.up_status = 'approve'", nativeQuery = true)
	public List<News> searchNewsByDescription(@Param("the_description") String the_description);
	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param newsId
	 * @return
	 */
	public News findByNewsId(int newsId);
	/** 
	 * @author tgnghia 
	 * @created date Nov 15, 2018 
	 * @modified date Nov 15, 2018 
	 * @version 1.0 
	 * @description 
	 * @param pinned
	 * @return
	 */
	public List<News> findByPinnedOrderByNewsIdDesc(boolean pinned);
	

	
	@Query(value = "select id as news_id,title as news_title,img_url as news_img_url,the_description as news_the_description, content as news_content, creator as news_creator, confirm_leader as news_confirm_leader, confirm_date as news_confirm_date from news where (pinned =1 and up_status ='approve' and active_status = 1) ORDER BY confirm_date DESC;", nativeQuery = true)
	List<Object> findAllPinnedNews();
	@Query(value = "select id as news_id,title as news_title,img_url as news_img_url,the_description as news_the_description, content as news_content, creator as news_creator, confirm_leader as news_confirm_leader, confirm_date as news_confirm_date from news where (up_status ='approve' and active_status = 1) ORDER BY confirm_date DESC;", nativeQuery = true)
	List<Object> findPageNewsNews();
	// MR DUC thêm ngày 13.01.2018 ** START **
	@Query(value = "UPDATE news SET  active_status =:status WHERE id =:news_id;", nativeQuery = true)
	public void updateNewActiveStatus(@Param("status") int status,@Param("news_id") int news_id);
	// MR DUC thêm ngày 13.01.2018 ** END **
	public List<News> findAllByOrderByNewsIdDesc();
}

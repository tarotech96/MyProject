package global.testingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import global.testingsystem.entity.SlideBanner;

@Repository
public interface SlideBannerRepository extends JpaRepository<SlideBanner, Integer> {
    
	 /**
	 * Create by: HaNuoc
	 * Create date: Nov 13, 2018
	 * Modifier: HaNuoc
	 * Modified date: Nov 13, 2018
	 * Description: find by title containing slidebar
	 * Version 1.0
	 * @param title
	 * @return
	 */
	List<SlideBanner> findBytitleContaining(String title);
	 /**
	 * Create by: HaNuoc
	 * Create date: Nov 20, 2018
	 * Modifier: HaNuoc
	 * Modified date: Nov 20, 2018
	 * Description: ....
	 * Version 1.0
	 * @return
	 */
	List<SlideBanner> findByshowTrue();
	List<SlideBanner> findAllByOrderByIdDesc();
}

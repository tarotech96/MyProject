package global.testingsystem.service;

import java.util.List;

import global.testingsystem.entity.SlideBanner;

 /**
 * Create by: HaNuoc
 * Create date: Nov 13, 2018
 * Modifier: HaNuoc
 * Modified date: Nov 13, 2018
 * Description: ....
 * Version 1.0
 */
public interface SlideBannerService {
    
     /**
     * Create by: HaNuoc
     * Create date: Nov 13, 2018
     * Modifier: HaNuoc
     * Modified date: Nov 13, 2018
     * Description: get list slidebar
     * Version 1.0
     * @return
     */
    List<SlideBanner> getAllListSlidebar();
     /**
     * Create by: HaNuoc
     * Create date: Nov 13, 2018
     * Modifier: HaNuoc
     * Modified date: Nov 13, 2018
     * Description: insert slidebar
     * Version 1.0
     * @param s
     * @return
     */
    boolean insertSlidebar(SlideBanner s);
     /**
     * Create by: HaNuoc
     * Create date: Nov 13, 2018
     * Modifier: HaNuoc
     * Modified date: Nov 13, 2018
     * Description: update slidebar
     * Version 1.0
     * @param s
     * @return
     */
    boolean updateSlidebar(SlideBanner s);
     /**
     * Create by: HaNuoc
     * Create date: Nov 13, 2018
     * Modifier: HaNuoc
     * Modified date: Nov 13, 2018
     * Description: delete slidebar
     * Version 1.0
     * @param id
     * @return
     */
    boolean deleteSlidebar(int id);
     /**
     * Create by: HaNuoc
     * Create date: Nov 13, 2018
     * Modifier: HaNuoc
     * Modified date: Nov 13, 2018
     * Description: filter slidebar by title
     * Version 1.0
     * @param title
     * @return
     */
    List<SlideBanner> filterSlidebarByTitle (String title);
     /**
     * Create by: HaNuoc
     * Create date: Nov 20, 2018
     * Modifier: HaNuoc
     * Modified date: Nov 20, 2018
     * Description: GET LIST SLIDEBAR active
     * Version 1.0
     * @return
     */
    List<SlideBanner> getListSlideBarActive();
     /**
     * Create by: HaNuoc
     * Create date: Nov 20, 2018
     * Modifier: HaNuoc
     * Modified date: Nov 20, 2018
     * Description: bind slidebar by id
     * Version 1.0
     * @param id
     * @return
     */
    SlideBanner findSlideBarById(int id);
    
    List<SlideBanner> search(String key);
}

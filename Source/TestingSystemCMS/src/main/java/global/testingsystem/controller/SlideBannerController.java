/**
 * 
 */
package global.testingsystem.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.servlet.ServletContext;

import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import global.testingsystem.entity.SlideBanner;
import global.testingsystem.service.SlideBannerService;
import global.testingsystem.util.ConstantPage;

/**
 * Create by: HaNuoc
 * Create date: Nov 13, 2018 
 * Modifier: HaNuoc 
 * Modified date:
 * Nov 13, 2018 Description: .... Version 1.0
 */
@CrossOrigin(origins = "*")
@RestController
public class SlideBannerController  {

    

	public SlideBannerController() {
		super();
		// TODO Auto-generated constructor stub
	}

	private Logger log = Logger.getLogger(SlideBannerController.class);
    @Autowired
    private SlideBannerService slideBarService;
    @Autowired
    private ServletContext servletContext;

    

	@GetMapping(value = ConstantPage.REST_API_GET_ALL_SLIDEBANNER,
    		produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE, })
    public List<SlideBanner> list() {
        List<SlideBanner> listSlideBar = slideBarService.getAllListSlidebar();
        return listSlideBar;
    }
    
    @DeleteMapping(value = ConstantPage.REST_API_DELETE_SLIDEBANNER_BY_ID,
    		produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE, })
    public boolean delete(@PathVariable int id) {
        return slideBarService.deleteSlidebar(id);
    }
    
    @GetMapping(value = ConstantPage.REST_API_FILTER_SLIDEBANNER_BY_TITLE,
    		produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE, })
    public List<SlideBanner> getListFilterSlideBar(@PathVariable String title) {
        return slideBarService.filterSlidebarByTitle(title);
    }

    @PostMapping(value = ConstantPage.REST_API_INSERT_SLIDEBANNER)
    public ResponseEntity<Object> insert(@RequestParam("image") MultipartFile image,
            @RequestParam("slidebar") String slidebar) {
        // parse JSONstring to JSONobject
        JSONObject jsonObject = new JSONObject(slidebar);
        String title = jsonObject.getString("title");
        String slogan = jsonObject.getString("slogan");
       // init new slidebar
        SlideBanner s = new SlideBanner(title, image.getOriginalFilename(), slogan, false);

       // update an object of slidebar
        boolean isSuccess = slideBarService.insertSlidebar(s);
        String pathToSave = servletContext.getRealPath(ConstantPage.PATH_SAVE_SLIDEBANNER_UPLOAD);
        File  imageFile = new File(pathToSave + "/" + image.getOriginalFilename());
            try {
                //transfer the received file to the given destination file
                image.transferTo(imageFile);
            } catch (IllegalStateException e) {
                log.error("Co loi khi upload file");
            } catch (IOException e) {
                log.error("Sai duong dan file");
            }
        return new ResponseEntity<>(isSuccess, HttpStatus.OK);
    }
    @PostMapping(value = ConstantPage.REST_API_UPDATE_SLIDEBANNER)
    public ResponseEntity<Object> update(@RequestParam(required = false) MultipartFile image,
            @RequestParam("slidebar") String slidebar) {
        // parse JSONstring to JSONobject
        JSONObject jsonObject = new JSONObject(slidebar);
        int id = jsonObject.getInt("id");
        String title = jsonObject.getString("title");
        String slogan = jsonObject.getString("slogan");
        SlideBanner s = slideBarService.findSlideBarById(id);
        //init new slidebar
        String pathToSave ="";
    	if (image != null) {
    		pathToSave= servletContext.getRealPath(ConstantPage.PATH_SAVE_SLIDEBANNER_UPLOAD);
        File  imageFile = new File(pathToSave + "/" + image.getOriginalFilename());
            try {
                //transfer the received file to the given destination file
                image.transferTo(imageFile);
            } catch (IllegalStateException e) {
                log.error("Co loi khi upload file");
            } catch (IOException e) {
                log.error("Sai duong dan file");
            }
            s.setImg(image.getOriginalFilename());
    	}
    	s.setTitle(title);
    	s.setSlogan(slogan);
            // update an object of slidebar
             boolean isSuccess = slideBarService.updateSlidebar(s);
        return new ResponseEntity<>(isSuccess, HttpStatus.OK);
    }
    @GetMapping(value = ConstantPage.REST_API_GET_ALL_SLIDEBANNER_ACTIVE,
    		produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE,})
    public List<SlideBanner> getListSlideBarActive() {
        List<SlideBanner> listSlideBar = slideBarService.getListSlideBarActive();
        return listSlideBar;
    }
    
    @PostMapping(value = ConstantPage.REST_API_UPDATE_SLIDEBANNER_ACTIVE)
    public ResponseEntity<Object>  updateSlideBarStatus(@RequestParam("slidebar") String slidebar) {
        // parse JSONstring to JSONobject
        JSONObject jsonObject = new JSONObject(slidebar);
        int id = jsonObject.getInt("id");
        boolean isShow = jsonObject.getBoolean("show");
        // find SlideBar by id
        SlideBanner s = slideBarService.findSlideBarById(id);
        // update status of SlideBar found
        s.setShow(isShow);
        // update an object of slidebar
        boolean isSuccess = slideBarService.updateSlidebar(s);
        return new ResponseEntity<>(isSuccess, HttpStatus.OK);
    }
    
	 @PostMapping(value = ConstantPage.REST_API_SEARCH_KEY_SLIDEBANNER,
	    		produces = { MediaType.APPLICATION_PROBLEM_JSON_VALUE, })
	    public List<SlideBanner> searchSlidebanner(@RequestParam("data") String data) {
		 JSONObject jsonObject = new JSONObject(data);
	        String key = jsonObject.getString("key");
	        List<SlideBanner> listSlidebanner = slideBarService.search(key);
	        return listSlidebanner;
	    }

}

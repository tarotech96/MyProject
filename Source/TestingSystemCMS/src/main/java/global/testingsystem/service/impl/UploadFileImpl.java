package global.testingsystem.service.impl;


import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.ServletContext;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import global.testingsystem.service.UploadFileService;
@Service
public class UploadFileImpl implements UploadFileService { 
	private final Path rootLocation = Paths.get("upload-dir");
	private Logger log = Logger.getLogger(UploadFileImpl.class);
	@Autowired
	private ServletContext servletContext;
    @Async
	@Override
	public String saveFile(MultipartFile file) {
		try {
			File files=new File(rootLocation+"/"+file.getOriginalFilename());
			if(files.exists()) return "Success";
			Files.copy(file.getInputStream(), this.rootLocation.resolve(file.getOriginalFilename()));
			return "Success";
		} catch (Exception e) {
			throw new RuntimeException("FAIL!");
		}
	}
	@Override
	public Resource findFileByName(String nameFile) {
		// TODO Auto-generated method stub
		try {
            Path filePath = this.rootLocation.resolve(nameFile).normalize();
            Resource resource = (Resource) new UrlResource(filePath.toUri());
            if(resource.exists()) {
                return resource;
            } else {
                throw new Exception();
            }
        } catch (Exception ex) {
             return null;
        }
	}
	@Override
	public String saveFileVer(MultipartFile file,String pathSave) {
		 String pathToSave = servletContext.getRealPath(pathSave);
		 File  fileTranfer = new File(pathToSave + "/" + file.getOriginalFilename());
         try {
             //transfer the received file to the given destination file
             file.transferTo(fileTranfer);
         } catch (IllegalStateException e) {
             log.error("Co loi khi upload file");
         } catch (IOException e) {
             log.error("Sai duong dan file");
         }
		return file.getOriginalFilename();
	}
}
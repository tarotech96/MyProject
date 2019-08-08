package global.testingsystem.controller;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import global.testingsystem.entity.ErrorDetail;

@ControllerAdvice
@RestController
public class ExceptionController extends ResponseEntityExceptionHandler {
	@ExceptionHandler(Exception.class)
	  public final ResponseEntity<ErrorDetail> handleAllException(Exception ex, WebRequest request) {
	    ErrorDetail errorDetail = new ErrorDetail(new Date(), ex.getMessage(),
	        request.getDescription(false));
	    return new ResponseEntity<>(errorDetail, HttpStatus.INTERNAL_SERVER_ERROR);
	  }
}

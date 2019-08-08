package global.testingsystem.entity;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class CustomError {
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public static class GeneralError extends RuntimeException {

		private static final long serialVersionUID = 1L;

		public GeneralError(String exception) {
		    super(exception);
		  }

		}
}

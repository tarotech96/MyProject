package global.testingsystem.util;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class ResponseStatus {
    // 200 - Success
    public static Object responseOk(String mesage){
        HashMap<String, String> map = new HashMap<>();
        map.put("err", mesage);
        return new ResponseEntity<Map<String, String>>(map, HttpStatus.OK);
    }

    // 201 - Tạo thành công
    public static Object responseCreated(String mesage){
        HashMap<String, String> map = new HashMap<>();
        map.put("err", mesage);
        return new ResponseEntity<Map<String, String>>(map, HttpStatus.CREATED);
    }

    // 403 - Chưa được kích hoạt
    public static Object responseForbidden(String mesage){
        HashMap<String, String> map = new HashMap<>();
        map.put("err", mesage);
        return new ResponseEntity<Map<String, String>>(map, HttpStatus.FORBIDDEN);
    }

    // 400 - Request không hợp lệ
    public static Object responseBadRequest(String mesage){
        HashMap<String, String> map = new HashMap<>();
        map.put("err", mesage);
        return new ResponseEntity<Map<String, String>>(map, HttpStatus.BAD_REQUEST);
    }

    // 404 - Không tìm thấy
    public static Object responseNotFound(String mesage){
        HashMap<String, String> map = new HashMap<>();
        map.put("err", mesage);
        return new ResponseEntity<Map<String, String>>(map, HttpStatus.NOT_FOUND);
    }

    // 401 - Tài khoản bị khóa hoặc không đươc phép truy cập
    public static Object responseUnauthorized(String mesage){
        HashMap<String, String> map = new HashMap<>();
        map.put("err", mesage);
        return new ResponseEntity<Map<String, String>>(map, HttpStatus.UNAUTHORIZED);
    }

    // 500 - Server error
    public static Object responseServerError(String mesage){
        HashMap<String, String> map = new HashMap<>();
        map.put("err", mesage);
        return new ResponseEntity<Map<String, String>>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}

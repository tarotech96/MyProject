package global.testingsystem.service;

import java.util.List;

import global.testingsystem.entity.Exam_Setting;

public interface ExamSettingService {
    Exam_Setting saveExamSetting(Exam_Setting exam_Setting);
    List<Object> listExamSetting(int examId);
    void deleteExamSetting(int examId);
} 

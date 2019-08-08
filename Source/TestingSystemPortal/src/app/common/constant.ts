export class Constant {
   public static readonly BASE_URL = 'http://localhost:8080';
  // public static readonly BASE_URL = 'https://3558181a.ngrok.io';
  public static readonly BASE_URL_FRONTEND = 'http://localhost:4200';
  // permission api
  public static readonly API_GET_ALL_PERMISSION =
    Constant.BASE_URL + '/permission/list';
  public static readonly API_INSERT_PERMISSION =
    Constant.BASE_URL + '/permission/insert';
  public static readonly API_UPDATE_PERMISSION =
    Constant.BASE_URL + '/permission/update';
  public static readonly API_DELETE_PERMISSION_BY_ID =
    Constant.BASE_URL + '/permission/delete';
  public static readonly API_FILTER_PERMISSION =
    Constant.BASE_URL + '/list-filter-cmcer';
  public static readonly API_CONTROLLER_PERMISSION =
    Constant.BASE_URL + '/permission/listController';
  public static readonly API_ACTION_PERMISSION =
    Constant.BASE_URL + '/permission/listAction';
  public static readonly API_SEARCH_PERMISSION =
    Constant.BASE_URL + '/permission/search';

  // Matrix User-Role
  public static readonly API_addUsersRole =
    Constant.BASE_URL + '/users/addUserRole';
  public static readonly API_getAllUsersRole =
    Constant.BASE_URL + '/users/getAllUserRole';
  public static readonly API_removeUsersRole =
    Constant.BASE_URL + '/users/removeUserRole';
  // menu api
  public static readonly API_GET_ALL_MENU = Constant.BASE_URL + '/menu/list';
  // public static readonly API_GET_ALL_MENU =
  //   Constant.BASE_URL + '/menu/list';
  // public static readonly API_GET_ALL_MENU =
  //   Constant.BASE_URL + '/menu/list';
  public static readonly API_GET_LIST_PARENT_NAME =
    Constant.BASE_URL + '/menu/parentname';
  public static readonly API_INSERT_MENU = Constant.BASE_URL + '/menu/insert';
  public static readonly API_UPDATE_MENU = Constant.BASE_URL + '/menu/update';
  public static readonly API_DELETE_MENU_BY_ID =
    Constant.BASE_URL + '/menu/delete';
  public static readonly API_LIST_MENU_TREE =
    Constant.BASE_URL + '/menu/listMenuTree';
  public static readonly API_LIST_MENU_USER =
    Constant.BASE_URL + '/menu/listMenuUser';
  public static readonly API_SEARCH_MENU_BY_NAME =
    Constant.BASE_URL + '/menu/search';
  // //thua chua dung den
  // public static readonly API_FILTER_MENU = '/list-filter-cmcer';
  // public static readonly API_CONTROLLER_MENU = '/menu/listController';
  // public static readonly API_ACTION_MENU = '/menu/listAction';

  // slidebanner api
  public static readonly API_GET_ALL_SLIDEBARS =
    Constant.BASE_URL + '/slidebanner/list';
  public static readonly API_INSERT_SLIDEBARS =
    Constant.BASE_URL + '/slidebanner/insert';
  public static readonly API_UPDATE_SLIDEBARS =
    Constant.BASE_URL + '/slidebanner/update';
  public static readonly API_DELETE_SLIDEBARS_BY_ID =
    Constant.BASE_URL + '/slidebanner/delete';
  public static readonly API_FILTER_SLIDEBARS_BY_TITLE =
    Constant.BASE_URL + '/slidebanner/list/filter';
  public static readonly API_GET_ALL_SLIDEBARS_ACTIVE =
    Constant.BASE_URL + '/slidebanner/list/active';
  public static readonly API_UPDATE_SLIDEBARS_ACTIVE =
    Constant.BASE_URL + '/slidebanner/update/status';

  public static readonly API_SEARCH_SLIDEBANNER =
    Constant.BASE_URL + '/slidebanner/search';

  // job api
  public static readonly API_GET_ALL_JOBS = Constant.BASE_URL + '/job/list';
  public static readonly API_GET_ALL_JOBS_ACTIVE =
    Constant.BASE_URL + '/job/list/active';
  public static readonly API_SEARCH_JOB_BY_ID =
    Constant.BASE_URL + '/job/search';
  public static readonly API_INSERT_JOBS = Constant.BASE_URL + '/job/insert';
  public static readonly API_UPDATE_JOBS = Constant.BASE_URL + '/job/update';
  public static readonly API_DELETE_JOBS_BY_ID =
    Constant.BASE_URL + '/job/delete';
  public static readonly API_FILTER_JOBS_BY_NAME =
    Constant.BASE_URL + '/job/filter';

  // BEN ANH DUC
  public static readonly API_GET_ALL_TAG = Constant.BASE_URL + '/tag/list';
  public static readonly API_GET_ALL_NEWS = Constant.BASE_URL + '/news/list';
  public static readonly API_GET_NEWS_BY_ID = Constant.BASE_URL + '/news';
  public static readonly API_INSERT_NEWS = Constant.BASE_URL + '/news/insert';

  public static readonly API_UPDATE_NEWS = Constant.BASE_URL + '/news/update';
  public static readonly API_DELETE_NEWS = Constant.BASE_URL + '/news/delete';
  public static readonly API_SEARCH_NEWS = Constant.BASE_URL + '/news/search';
  public static readonly API_SEARCH_NEWS_CMS =
    Constant.BASE_URL + '/news/searchnewscms';
  public static readonly API_SORT_NEWS = Constant.BASE_URL + '/new/sort';
  public static readonly API_PIN_NEWS = Constant.BASE_URL + '/news/pin';

  public static readonly API_GET_ALL_PAGENEWS_NEWS =
    Constant.BASE_URL + '/news/pagenewsnews';
  public static readonly API_GET_ALL_PINNED_NEWS =
    Constant.BASE_URL + '/news/pinnednews';
  public static readonly API_UPDATE_NEWS_ACTIVE_STATUS =
    Constant.BASE_URL + '/news/activestatus';
  // public static readonly API_GET_NEWS_HOMEPAGE =
  //   Constant.BASE_URL + '/news/newspage';
  // public static readonly URL_COMMENTS =
  //   Constant.BASE_URL + '/comments?newsId=';
  // public static readonly URL_COMMENTS_ADD = Constant.BASE_URL + '/comment';
  // public static readonly URL_COMMENTS_UPDATE = Constant.BASE_URL + '/comments';
  // public static readonly URL_COMMENTS_DELETE = Constant.BASE_URL + '/comments';

  public static hdd = 'hidden';
  public static t1h = 'none';
  public static t2h = 'flex';
  public static t3h = 'visible';
  public static t4h = 'hidden';
  public static ss = false;

  // NAM NAM CT
  public static readonly API_CREATE_USER_REGISTRATION =
    Constant.BASE_URL + '/registration';
  public static readonly API_CREATE_USER_LOGOUT =
    Constant.BASE_URL + '/user/logout';
  public static readonly API_EDIT_PROFILE =
    Constant.BASE_URL + '/user/changeprofile';
  public static readonly API_EDIT_PROFILE_NO_IMAGE =
    Constant.BASE_URL + '/user/changeprofile/noimage';

  // DUC USER
  public static readonly API_INSERT_USERS = Constant.BASE_URL + '/users/insert';
  public static readonly API_GET_ALL_USERS = Constant.BASE_URL + '/users/list';
  public static readonly API_UPDATE_USERS = Constant.BASE_URL + '/users/update';
  public static readonly API_FORGOT_PASSWORD_USERS =
    Constant.BASE_URL + '/forgotpass';
  public static readonly API_GET_USER_BY_ID = Constant.BASE_URL + '/users/';
  public static readonly API_CHANGE_PASSWORD_USERS =
    Constant.BASE_URL + '/changepassword';
  public static readonly API_DELETE_USERS = Constant.BASE_URL + '/users/delete';
  public static readonly API_SEARCH_USERS = Constant.BASE_URL + '/users/search';
  public static readonly API_SORT_USERS = Constant.BASE_URL + '/users/sort';
  public static readonly API_USERS_PROFILE =
    Constant.BASE_URL + '/users/profile';
  public static readonly API_GET_USERS_ID = Constant.BASE_URL + '/users/';
  public static readonly API_SEARCH_LIST_USER_ROLE =
    Constant.BASE_URL + '/user/search';

  public static readonly API_GET_LISTUSERCOMPLETE =
    Constant.BASE_URL + '/users/listUserComplete';
  public static readonly API_GET_LISTUSERINCOMPLETE =
    Constant.BASE_URL + '/users/listUserInComplete';

  public static readonly API_GET_LIST_EXAM_USERS_COMPLETED =
    Constant.BASE_URL + '/users/listExamUserCompleted';
  public static readonly API_GET_LIST_PRACTICE_USERS_COMPLETED =
    Constant.BASE_URL + '/users/listPracticeUserCompleted';
  public static readonly API_CHECK_USER_IS_TEST =
    Constant.BASE_URL + '/users/isTest';
    public static readonly API_SET_USER_TEST =
    Constant.BASE_URL + '/users/isTestIstrue';
    public static readonly API_CHECK_TOKEN =
    Constant.BASE_URL + '/checkToken';
  // NUOC ROLE

  public static readonly API_INSERT_ROLE = Constant.BASE_URL + '/role/insert';
  public static readonly API_UPDATE_ROLE = Constant.BASE_URL + '/role/update';
  public static readonly API_DELETE_ROLE = Constant.BASE_URL + '/role/delete';
  public static readonly API_LIST_ROLE = Constant.BASE_URL + '/role/list';
  public static readonly API_SORT_ROLE = Constant.BASE_URL + '/role/sort';
  public static readonly API_SEARCh_ROLE = Constant.BASE_URL + '/role/search';
  // lam
  public static readonly API_SEARCH_ROLE_PERMISSION =
    Constant.BASE_URL + '/role/searchRolePermission';
  //

  // Subject
  public static readonly API_GET_ALL_SUBJECT =
    Constant.BASE_URL + '/subject/list';
  public static readonly API_INSERT_SUBJECT =
    Constant.BASE_URL + '/subject/insert';
  public static readonly API_UPDATE_SUBJECT =
    Constant.BASE_URL + '/subject/update';
  public static readonly API_DELETE_SUBJECT =
    Constant.BASE_URL + '/subject/delete';
  public static readonly API_SEARCh_SUBJECT =
    Constant.BASE_URL + '/subject/search';
  public static readonly API_SORT_SUBJECT = Constant.BASE_URL + '/subject/sort';

  // Subject MR DUC
  public static readonly API_GET_SUBJECT_BY_ID = Constant.BASE_URL + '/subject';

  // Chapter
  public static readonly API_GET_ALL_CHAPTER =
    Constant.BASE_URL + '/chapter/list';
  public static readonly API_GET_ALL_CHAPTER_OBJECT =
    Constant.BASE_URL + '/listchapter';
  public static readonly API_INSERT_CHAPTER =
    Constant.BASE_URL + '/chapter/insert';
  public static readonly API_UPDATE_CHAPTER =
    Constant.BASE_URL + '/chapter/update';
  public static readonly API_DELETE_CHAPTER =
    Constant.BASE_URL + '/chapter/delete';
  public static readonly API_SEARCh_CHAPTER =
    Constant.BASE_URL + '/chapter/search';
  public static readonly API_SORT_CHAPTER = Constant.BASE_URL + '/chapter/sort';
  public static readonly API_getLisChapterBySubject =
    Constant.BASE_URL + '/chapter/getChapterBySubject/';
  public static readonly API_getLisChapterBySubjectAndParent =
    Constant.BASE_URL + '/chapter/getChapterBySubjectAndParent/';

  // Domain
  public static readonly API_GET_ALL_DOMAIN =
    Constant.BASE_URL + '/domain/list';
  public static readonly API_INSERT_DOMAIN =
    Constant.BASE_URL + '/domain/insert';
  public static readonly API_UPDATE_DOMAIN =
    Constant.BASE_URL + '/domain/update';
  public static readonly API_DELETE_DOMAIN =
    Constant.BASE_URL + '/domain/delete';
  public static readonly API_SEARCh_DOMAIN =
    Constant.BASE_URL + '/domain/search';
  public static readonly API_SORT_DOMAIN = Constant.BASE_URL + '/domain/sort';
  public static readonly API_getLisDomainBySubject =
    Constant.BASE_URL + '/domain/getDomainBySubject/';

  // Group
  public static readonly API_LIST_GROUP = Constant.BASE_URL + '/group/list';
  public static readonly API_LIST2_GROUP = Constant.BASE_URL + '/group/list2';
  public static readonly API_INSERT_GROUP = Constant.BASE_URL + '/group/insert';
  public static readonly API_UPDATE_GROUP = Constant.BASE_URL + '/group/update';
  public static readonly API_DELETE_GROUP_BY_ID =
    Constant.BASE_URL + '/group/delete';
  public static readonly API_SEARCH_GROUP_BY_NAME =
    Constant.BASE_URL + '/group/search';
  public static readonly API_SORT_GROUP = Constant.BASE_URL + '/group/sort';
  public static readonly API_LIST_USER_GROUP = Constant.BASE_URL + '/group/listUser';
  public static readonly API_ADD_USER_GROUP = Constant.BASE_URL + '/group/addUser';
  public static readonly API_REMOVE_USER_GROUP = Constant.BASE_URL + '/group/removeUser';
  // Exam
  public static readonly API_LIST_EXAM = Constant.BASE_URL + '/exam/list';
  public static readonly API_INSERT_EXAM = Constant.BASE_URL + '/exam/insert';
  public static readonly API_UPDATE_EXAM = Constant.BASE_URL + '/exam/update';
  public static readonly API_UPDATE_FILE_EXAM =
    Constant.BASE_URL + '/exam/updateFile';
  public static readonly API_UPDATE_STATUS_EXAM =
    Constant.BASE_URL + '/exam/updateStatus';
  public static readonly API_SEARCH_EXAM = Constant.BASE_URL + '/exam/search';
  public static readonly API_ADD_EXAMQUESTION =
    Constant.BASE_URL + '/exam/addExamService';
  public static readonly API_ADD_EXAMQUESTIONRANDOM =
    Constant.BASE_URL + '/exam/addExamRandom';
  public static readonly API_GET_LIST_USER_BY_EXAM_ID =
    Constant.BASE_URL + '/exam/listUserExam';
  public static readonly API_GET_LIST_GROUP_BY_EXAM_ID =
    Constant.BASE_URL + '/exam/listGroupExam';
  public static readonly API_GET_LIST_QUESTION_EXAM_ID =
    Constant.BASE_URL + '/exam/listQuestion';
  public static readonly API_GET_EXAM_BY_ID =
    Constant.BASE_URL + '/exam/findByID';
  public static readonly API_ADD_EXAM_PRACTISE =
    Constant.BASE_URL + '/exam/insertPractise';
  public static readonly API_GET_EXAMSETTING_BY_EXAM =
    Constant.BASE_URL + '/exam/getListExamSetting';
  public static readonly API_GET_EXAM_BY_CODE =
    Constant.BASE_URL + '/exam/getExamByCode';
  public static readonly API_INSERT_EXAM_RESULT =
    Constant.BASE_URL + '/examResult/insert';
  public static readonly API_UPDATE_EXAM_RESULT =
    Constant.BASE_URL + '/examResult/update';
  public static readonly API_GET_EXAMRESULT_BY_USER_EXAM =
    Constant.BASE_URL + '/examResult/getExamResultByUserExam';
  public static readonly API_GET_LIST_EXAMRESULT =
    Constant.BASE_URL + '/exam/getListExamResult/';
  public static readonly API_UPDATE_COMPLETE_RESULT =
    Constant.BASE_URL + '/examResult/updateComplete';
  public static readonly API_UPDATE_TIME_RESULT =
    Constant.BASE_URL + '/examResult/updateTime';
  public static readonly API_GET_FREE_TEST_RESULT =
    Constant.BASE_URL + '/examResult/getFreeTestResult';
  public static readonly API_GET_QUESTION_LIST =
    Constant.BASE_URL + '/question/list';

  public static readonly API_GET_PRACTICE_HOMEPAGE =
    Constant.BASE_URL + '/practice/pacticehomepage';
    public static readonly API_GET_QUESTION_IN_SUBJECT =
    Constant.BASE_URL + '/exam/getQuestionInSubject';

    public static readonly API_GET_QUESTION_IN_SUBJECT2 =
    Constant.BASE_URL + '/exam/getQuestionInSubject2';
  public static readonly API_GET_LIST_PRACTICE_BY_USER =
    Constant.BASE_URL + '/practice';
  public static readonly API_GET_EXAM_BY_IDS = Constant.BASE_URL + '/exams';
  public static readonly API_GET_LIST_EXAM_USERS_ASC_BY_END_DATE =
    Constant.BASE_URL + '/exams_asc';

    public static readonly API_SUM_USER_TEST =
    Constant.BASE_URL + '/exam/sumUserTest';

  public static readonly API_EXAMRESULT_BY_USER_ID_AND_EXAM_ID =
    Constant.BASE_URL + '/examResult/getListExamResultByUserIDExamID';
  public static readonly API_PRACTICERESULT_BY_USER_ID_AND_PRARICE_ID =
    Constant.BASE_URL + '/examResult/getListPracticeResultByUserIDPracticeID';
  public static readonly GET_LIST_EXAM_OF_USER =
    Constant.BASE_URL + '/users/listexamofuser';
  public static readonly GET_LIST_PRACTICE_OF_USER =
    Constant.BASE_URL + '/users/listpracticeofuser';
  // CUSTOMER
  public static readonly API_GET_ALL_CUSTOMER =
    Constant.BASE_URL + '/customer/list';
  public static readonly API_INSERT_CUSTOMER =
    Constant.BASE_URL + '/customer/insert';
  public static readonly API_DELETE_CUSTOMER =
    Constant.BASE_URL + '/customer/delete';
  public static readonly API_SEARCh_CUSTOMER =
    Constant.BASE_URL + '/customer/search';
  public static readonly API_SORT_CUSTOMER =
    Constant.BASE_URL + '/customer/sort';
  public static readonly API_UPDATE_EXAMQUESTION =
    Constant.BASE_URL + '/exam/updateExamService';

  public static readonly ADD_EXAM_CREATTYPE =
    Constant.BASE_URL + '/exam/addCreatType';

  public static readonly API_INSERT_EXAMANSWER =
    Constant.BASE_URL + '/examAnswer/insert';
  public static readonly API_UPDATE_EXAMANSWER =
    Constant.BASE_URL + '/examAnswer/update';
  public static readonly API_DELETE_EXAMANSWER =
    Constant.BASE_URL + '/examAnswer/delete';
  public static readonly API_LIST_QUESTION_EXAM_BY_RESULT_ID =
    Constant.BASE_URL + '/examAnswer/listQuestionResult';

  // QUESTION
  public static readonly API_DOWNLOADFILE =
    Constant.BASE_URL + '/question/downloadFileExcel';
  public static readonly API_SEARCH_QUESTION =
    Constant.BASE_URL + '/question/search';
}

export interface Exam {
  id: number;
  code: string;
  created_at: Date;
  decription: string;
  time: number;
  media: string;
  name: string;
  question_num: number;
  status: number;
  title: string;
  updated_at: Date;
  end_date: Date;
  max_attempt: number;
  percent_passing: number;
  start_date: Date;
  subject_id: number;
  creator: number;
  create_type: number;
  type: number;
}

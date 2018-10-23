export default interface TodoItem {
  name: string;
  owner: string;
  start_time: Date;
  stop_time: Date;
  complete: boolean;
  sessions: number;
  [key: string]: any;
}
export default interface User {
  name: string;
  email: string;
  password: string;
  location: string;
  [key: string]: string;
}
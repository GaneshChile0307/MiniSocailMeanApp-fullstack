export interface Post {
  [x: string]: any;
  id:string;
  title: string;
  content: string;
  creator: string | null | undefined
}

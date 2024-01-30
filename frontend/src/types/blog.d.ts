export interface IResponse {
  message: string;
  success: boolean;
}
export interface IBlog {
  _id: string;
  title: string;
  body: string;
  userId: string;
  createdAt: string;
}

export interface IComment {
  _id: string;
  name: string;
  body: string;
  createdAt: string;
}

export interface IBlogsData extends IResponse {
  data: {
    total: number;
    blogs: IBlog[];
  };
}

export interface ICommentsData extends IResponse {
  data: {
    total: number;
    comments: IComment[];
  };
}

export interface IBlogData extends IResponse {
  data: IBlog;
}

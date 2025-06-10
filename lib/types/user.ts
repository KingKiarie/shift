export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: string;
  companyCode: string;
  isActive: boolean;
  createdAt: string;
}

export interface GetUsersResponse {
   
  data: User[];
  total: number;
}

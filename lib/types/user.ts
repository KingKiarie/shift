export interface User {
  id: number;
  email: string;
  role: string;
  companyCode: string;
  isActive: boolean;
  createdAt: string;
  erpUserCode?: string;
  SalesRepName: string;
}

export interface GetUsersResponse {
  data: User[];
  total: number;
}

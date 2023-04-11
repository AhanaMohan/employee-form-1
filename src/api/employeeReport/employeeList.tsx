import api from 'src/api/api';
//To get the employee list from the API

// export const getEmployeeList = async () => {
export const getEmployeeList = async ({pageNo, pageSize}) => {
  const response: any = await api.actionHandler({
    
    url:api.employeeListURL
    .replace('{pageNo}', pageNo)
    .replace('{pageSize}', pageSize)
    .replace('{companyId}','6358dc15fa7df86801678548'),
    method: 'GET'
  });
  return response.data;
};



import axios from "axios";

const actionHandler = (payload:any) => {
  
  axios.defaults.headers["dbName"] = "mysaledb33011114564";
  axios.defaults.headers["Content-Type"] = "application/json";
  axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

  return new Promise((resolve, reject) => {
    payload.baseURL = "https://mysaleappcompanyapi-7lfpakcp7q-el.a.run.app/api/";
    axios(payload)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {
  employeeListURL :'Employees?&pageNo={pageNo}&pageSize={pageSize}&companyId={companyId}',
  // employeeListURL :'Employees?&companyId={companyId}',

  actionHandler,
};
export interface ICompany {
  id: string;
  companyName: string;
}

export interface IBranch {
  id: string;
  branchName: string;
}

export interface IPaymentMethod {
  id: string;
  paymentModeName: string;
}

export interface IPurchaseSeries {
  id: string;
  seriesName: string;
}
export interface ISaleSeries {
  id: string;
  seriesName: string;
}

export interface IQuotationSeries {
  id: string;
  seriesName: string;
}
export interface IPurchaseOrderSeries {
  id: string;
  seriesName: string;
}
export interface ISaleOrderSeries {
  id: string;
  seriesName: string;
}
export interface IDeliveryNoteSeries {
  id: string;
  seriesName: string;
}
export interface IDeliveryNoteReceiptSeries {
  id: string;
  seriesName: string;
}
export interface IStockLocation {
  id: any;
  stockLocationName: any;
}

export interface IEmployee {
  id: string;
  employeeName: string;
}

export interface IUsers {
  userGuid: string;
  userName: string;
}

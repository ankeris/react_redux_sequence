import axios, { AxiosResponse } from "axios";
import { from, Observable } from "rxjs";

export default class ValuesService {
  private port: string = '3000';
  private apiUrl: string = `http://localhost:${this.port}/api`;

  constructor() {}

   getPerson = (param: string): Observable<AxiosResponse<any>> => 
    from(axios.get<any>(`${this.apiUrl}/person/${param}`));

   getFacility = (param: number): Observable<AxiosResponse<any>> =>
    from(axios.get<any>(`${this.apiUrl}/facility/${param}`));

   getExposure = (param: number): Observable<AxiosResponse<any>> =>
    from(axios.get<any>(`${this.apiUrl}/exposure/${param}`));
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CategoryModel, CreateDoctorsModel, DoctorsDto, EditDoctorsModel } from '../doctor-list/doctors';

// const api = "https://dummyjson.com/products";
//  const api ='https://localhost:7209/api/Doctors/all';


const api ='https://localhost:7209/api/';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  controller = api + "Doctors/";
  
  constructor(private httpClient: HttpClient) { }

  // getAll(): Observable<ApiDoctors[]> {
  //   return this.httpClient.get<ApiDoctors[]>(api);
  // }

  // getAll(): Observable<DoctorRespons> {
  //   return this.httpClient.get<DoctorRespons>(api);
  // }
  getAll(): Observable<DoctorsDto[]> {
    return this.httpClient.get<DoctorsDto[]>(this.controller +'all');
  }
  get(id: number): Observable<DoctorsDto> {
    return this.httpClient.get<DoctorsDto>(this.controller + id);
  }

  create(model: CreateDoctorsModel): Observable<any> {
    return this.httpClient.post(this.controller , model);
  }
  edit(model: EditDoctorsModel): Observable<any> {
    return this.httpClient.put(this.controller, model);
  }
  getCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(api + 'Categorys/all');
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(this.controller + id);
  }
}
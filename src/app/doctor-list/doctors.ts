
// export interface DoctorRespons{
//     doctors: ApiDoctors[];
// }

export interface DoctorsDto{
    id: number;
    imageUrl: string;
    lastName: string;
    name: string;
    firstName: string;
    birthday: number;
    work_experience: number;
    archived: boolean;
    categoryId:number;
    actions:boolean;
    
}

export interface CreateDoctorsModel{
 id: number;
    imageUrl: string;
    lastName: string;
    name: string;
    firstName: string;
    birthday: number;
    work_experience: number;
    archived: string;
    categoryId:number;
    
}
export interface EditDoctorsModel{
    id: number;
    imageUrl: string;
    lastName: string;
    name: string;
    firstName: string;
    birthday: number;
    work_experience: number;
    archived: string;
    categoryId:number;

}

export interface CategoryModel {
    id: number;
    name: string;
}
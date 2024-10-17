import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DoctorService } from '../services/doctor.services';
import { CategoryModel, CreateDoctorsModel, DoctorsDto, EditDoctorsModel } from '../doctor-list/doctors';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor-form',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule
    ],
  templateUrl: './doctor-form.component.html',
  styleUrl: './doctor-form.component.css'
})
// export class DoctorFormComponent{
export class DoctorFormComponent implements OnInit {

  doctor: DoctorsDto | null = null;
  form: FormGroup;
  editMode: boolean = false;
  categories: CategoryModel[] = [];
  // constructor(private fb: FormBuilder) {
  //   this.form = fb.group({
  //     // imageUrl: ['', Validators.required],
  //     // lastName: ['', Validators.required],
  //     // name: ['', Validators.required],
  //     // firstName: ['', Validators.required],
  //     // birthday: [0, Validators.required],
  //     // work_experience: [0, Validators.required],
  //     // archived:[''],
  //     // categoryId: [0, Validators.required]
  //   });

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private doctorService: DoctorService,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      id: [0],
      imageUrl: ['', Validators.required],
      lastName: ['', Validators.required],
      name: ['', Validators.required],
      firstName: ['', Validators.required],
      birthday: [0, Validators.required],
      work_experience: [0, Validators.required],
      archived: [true, Validators.required],
      categoryId: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.doctorService.getCategories().subscribe(data => this.categories = data);
    const doctorId = Number(this.route.snapshot.paramMap.get('id'));


    if (doctorId) {
      this.editMode = true;
  
      this.doctorService.get(doctorId).subscribe(data => {
        this.doctor = data;
        this.form.patchValue(this.doctor);
        this.form.controls["categoryId"].setValue(this.doctor.categoryId.toString());
      });
    }
  }



  back() {
    history.back();
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, "OK", {
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }
  submit() {
    // console.log(this.form.value);
    if (!this.form.valid) {
      this.openSnackBar("Invalid data.");
      return;
    }

    const model = this.form.value;
    //  const model = this.form.value as CreateDoctorsModel;

    console.log(model);

    if (this.editMode) {
      console.log(model as EditDoctorsModel);
      
      this.doctorService.edit(model as EditDoctorsModel).subscribe(x => {
        this.openSnackBar("Product was updated successfully.");
        this.back();
      });
    }
    else {

    this.doctorService.create(model as CreateDoctorsModel).subscribe(x => {
      this.openSnackBar("Doctor was created successfully.");
      this.back();
    });
  }
  }
}

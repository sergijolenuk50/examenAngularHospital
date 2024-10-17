import { AfterViewInit, ChangeDetectionStrategy, Component, inject, model, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DoctorService } from '../services/doctor.services';
import { DoctorsDto } from './doctors';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';





// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];
export interface DialogData {
  doctorName: string;
  doctorld: number;
}

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule,MatPaginatorModule, MatPaginatorModule,RouterLink],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})

// export class DoctorListComponent {
  export class DoctorListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id','imageUrl','lastName', 'name', 'firstName', 'birthday','work_experience','archived','actions'];
  // dataSource = ELEMENT_DATA;
  // dataSource: ApiDoctors[] = [];
  dataSource = new MatTableDataSource<DoctorsDto>([]);


  //

  constructor(
    private doctorService: DoctorService,
     private dialog: MatDialog,
     private snackBar: MatSnackBar
     ) {
      this.doctorService.getAll()
        // .subscribe(data => this.dataSource = data
          .subscribe(data => this.dataSource.data = data
        )
    }
 
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  
  // console.log(doctorName);
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  edit(id: number) {

  }

  openDeleteDialog(doctorName: string, doctorld: number) {
  
    // console.log(doctorName);
  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
      data: {
        doctorName: doctorName,
        doctorld: doctorld
      },
    
    });
    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.doctorService.delete(id).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(x => x.id !== id);
          this.openSnackBar();
        });
      }
    });
  }

        openSnackBar() {
          this.snackBar.open('Product deleted successfuly', 'Dismiss', {
            horizontalPosition: "center",
            verticalPosition: "top",
          });
        }
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './confirm-dialog.html',
  //styleUrl: './confirm-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  readonly name = model(this.data.doctorName);
  readonly id = model(this.data.doctorld);

 
}
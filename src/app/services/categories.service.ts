import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private afs: AngularFirestore,
    private toastrService: ToastrService
    ){}

  saveData(data: Category){
    this.afs.collection('categories').add(data).then((docRef: any) =>{
      console.log(docRef);
      this.toastrService.success("Data Inserted Successfully..!")
    })
    .catch((err: any) => { console.log(err);
     })
  }

  loadData(){
    return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a =>{
          const  data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {data , id};
        })
      })
    )
}

  updateData(id, EditData){
    this.afs.doc(`categories/${id}`).update(EditData).then(docRef => {
      this.toastrService.success("Data Updated Successfully");
    })
  }

  deleteData(id){
    this.afs.doc(`categories/${id}`).delete().then(docRef => {
      this.toastrService.success("Data Deleted");
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{

  categoryArray!: any;
  formCategory!: any;
  formStatus: string = 'Add'
  categoryId: string;

  constructor(
    private categoryService: CategoriesService,
    ){}

    ngOnInit(): void {
     this.categoryService.loadData().subscribe(val => {
      console.log("Categories loaded",val);
      this.categoryArray = val;
     })
    }

    onSubmit(formData: NgForm){
    let categoryData: Category = {
      category: formData.value.category,
    }
    if(this.formStatus == 'Add'){
      this.categoryService.saveData(categoryData);
      formData.resetForm();
    }
    else if(this.formStatus == 'Edit'){
      this.categoryService.updateData(this.categoryId, categoryData)
      formData.resetForm(); 
      this.formStatus='Add'
    }
  }

  onEdit(category, id){
    this.formCategory = category;
    this.formStatus = 'Edit'
    this.categoryId = id;
  }

  onDelete(id){
    this.categoryService.deleteData(id);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-posts',
  templateUrl: './new-posts.component.html',
  styleUrls: ['./new-posts.component.scss']
})
export class NewPostsComponent implements OnInit{

  post: any = {};
  permalink: string = '';
  imgSrc: any = "./assets/images/placeholder-image.jpg";
  seletedImage: any;
  categories: any;
  postForm: FormGroup;
  formStatus: string = "Add New";
  docId: string;
  
  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute
    ){
      this.route.queryParams.subscribe((val: any) =>{
        this.docId = val.id;
        if(this.docId){
          this.postService.loadOneData(val.id).subscribe((post: Post) =>{
            this.post = post;
            this.postForm = this.fb.group({
              title: [this.post?.title ,[Validators.required, Validators.minLength(10)]],
              permalink: new FormControl({value: this.post?.permalink, disabled: true}, [Validators.required]),
              excerpt:[this.post?.excerpt,[Validators.required, Validators.minLength(50)]],
              category:[`${this.post?.category?.categoryId}-${this.post?.category?.category}`,[Validators.required]],
              postImg:['',[Validators.required]],
              content: [this.post?.content,[Validators.required]]
            });
            this.imgSrc = this.post?.postImgPath;
            this.formStatus = "Edit";
          })
        }
        else{
          this.postForm = this.fb.group({
            title: ['',[Validators.required, Validators.minLength(10)]],
            permalink: new FormControl({value: '', disabled: true}, [Validators.required]),
            excerpt:['',[Validators.required, Validators.minLength(50)]],
            category:['',[Validators.required]],
            postImg:['',[Validators.required]],
            content: ['',[Validators.required]]
          });
        }
      });
    }

  ngOnInit(): void{
    this.categoryService.loadData().subscribe(val => {
      this.categories = val;
    })
  }

  get fc(){
    return this.postForm?.controls || {};
  }

  onTitleChange($event){
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g,'-');
    this.postForm?.controls['permalink']?.setValue(this.permalink);    
  }
  showPreview($event){
    const reader = new FileReader();
    reader.onload = (e) =>{
      this.imgSrc = e.target.result
    }
    reader.readAsDataURL($event.target.files[0]);
    this.seletedImage = $event.target.files[0];
  }

  onSubmit(){
    let splittedCategory = this.postForm.value.category.split('-');
    
    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.controls['permalink'].value,
      category: {
        categoryId: splittedCategory[0],
        category: splittedCategory[1]
      },
      postImgPath:'',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views:0,
      status:'new',
      createdAt: new Date()
    }
    console.log(postData,"postData");
    
    this.postService.uploadImage(this.seletedImage, postData, this.formStatus, this.docId);
    this.postForm.reset();
    this.imgSrc = "./assets/images/placeholder-image.jpg"; 
  }
}

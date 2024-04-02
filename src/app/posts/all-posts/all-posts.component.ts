import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit{

  postArray: any;
  constructor(private postService: PostsService){}

  ngOnInit(): void {
    this.postService.loadData().subscribe(data =>{
      this.postArray = data;
    });
  }

  onDelete(postImgPath, id){
    this.postService.deleteImage(postImgPath,id);
  }

  onFeatured(id, isFeatured): void{
    const featuredData = {
      isFeatured
    }
    this.postService.markFeatured(id, featuredData);
  }

}

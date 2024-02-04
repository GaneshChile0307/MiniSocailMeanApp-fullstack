import { Component, OnInit } from '@angular/core';
import { MatButtonModule, } from '@angular/material/button';
import {MatInputModule} from "@angular/material/input"
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { PostsService } from '../posts.service';
import { Post } from '../post.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCardModule
  
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  post: Post | undefined;
  isLoading = false;
  private mode = "create";
  private postId: string | null | undefined;
  private creator: string | null; 

  constructor(public postsService: PostsService, public route: ActivatedRoute, private authservice :AuthService) {
    this.creator= authservice.getUserId()
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        if(this.postId){
          this.postsService.getPost(this.postId).subscribe(postData => {
            this.isLoading = false;
            this.post = {id: postData._id, title: postData.title, content: postData.content,creator:postData.creator};
          });
        }
         else{
          this.mode = "create";
          this.postId = null;
         }
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  
  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      if(this.creator)
      this.postsService.addPost(form.value.title, form.value.content , this.creator);
    } else {
      if(this.postId)
      this.postsService.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
}

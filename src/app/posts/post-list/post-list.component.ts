import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { Post } from '../post.model';

import { Subscription } from 'rxjs';
import { PostsService } from '../posts.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MatExpansionModule,CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit , OnDestroy {

  posts: Post[] = [];
  private postsSub: Subscription = new Subscription;
  userIsAuthenticated = false;
  private authStatusSub!: Subscription;
  userId!: string | null;

  constructor(public postsService: PostsService,   private authService: AuthService) {}

  ngOnInit() {
    this.postsService.getPosts();
    this.userId = this.authService.getUserId()
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId()
      });
  } 

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
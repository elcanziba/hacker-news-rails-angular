import { Component, OnInit, Input } from '@angular/core';
import Post from '../classes/post.class'


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.sass']
})
export class JobComponent implements OnInit {
  @Input() job: Post


  constructor() { }

  ngOnInit() {
    console.log(this.job)
  }

}

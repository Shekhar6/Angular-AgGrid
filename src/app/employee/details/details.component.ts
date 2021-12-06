import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  title: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.title =this.activatedRoute.snapshot.params.id;
    console.log(this.activatedRoute.snapshot.params.id);
  }

}

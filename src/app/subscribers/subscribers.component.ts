import { Component } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.scss']
})
export class SubscribersComponent {

  subscribersArray: any;
constructor(
  private subService: SubscribersService
){}

ngOnInit(){
  this.subService.loadData().subscribe(data =>{
    this.subscribersArray = data;
  });
}

deleteSubscriber(id){
  this.subService.deleteData(id);
}
}

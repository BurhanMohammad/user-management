import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
// SERVICES
import { GlobalDataService } from '@core/services/common';
import { AuthService } from '@core/services/auth';
import { UserListService } from '@core/services/auth';

// MODELS
import { PROFILE } from '@models/auth';
// ENV
import { environment } from '@environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userList!: PROFILE[];
  readonly userRoles: string[] = environment.userRoles;
  searchTerm = '';
  
  currentUser$: Observable<PROFILE | null> =
    this.globalData.currentUser$.asObservable();
  constructor(
    private globalData: GlobalDataService,
    private userListService: UserListService,
    private authService: AuthService
  ) {}

  
  async ngOnInit() {
    this.userList = await this.userListService.getAllUsers();
   console.log(this.userList, "W")
    
  }
  trackByFn(index: number, user: PROFILE): number {
    return user?.id;
  }
  logOut() {
    this.authService.logOut();
  }

  // Filter user list based on the search term
  filteredUserList(): PROFILE[] {
    if (!this.searchTerm.trim()) {
      return this.userList;
    }

    return this.userList.filter(user =>
      user.fullName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}

// pipe
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchTerm: string) {
    return items.filter(item => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
}

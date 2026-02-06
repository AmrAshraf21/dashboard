import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  
  currentUser = {
    name: 'Johny Larsen',
    avatar: 'assets/images/user-avatar.png'
  };

  notificationCount = 2;

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  onNotificationsClick(): void {
    // Handle notifications click
    console.log('Notifications clicked');
  }

  onProfileClick(): void {
    // Handle profile click
    console.log('Profile clicked');
  }
}
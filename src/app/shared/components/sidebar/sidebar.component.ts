import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  badge?: number;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpen = true;
  @Output() toggleSidebar = new EventEmitter<void>();

  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Orders', icon: 'receipt_long', route: '/orders' },
    { label: 'Users', icon: 'people', route: '/users' },
    { label: 'Items', icon: 'inventory_2', route: '/items' },
    { label: 'Transactions', icon: 'credit_card', route: '/transactions' },
    { label: 'Reports', icon: 'assessment', route: '/reports' },
    { label: 'Messages', icon: 'message', route: '/messages', badge: 3 },
    { label: 'Support', icon: 'support_agent', route: '/support' },
    { label: 'Settings', icon: 'settings', route: '/settings' }
  ];

  constructor(private router: Router) { }

  get filteredNavItems(): NavItem[] {
    // No auth/role filtering after auth removal
    return this.navItems;
  }

  logout(): void {
    // Redirect to dashboard (no login page)
    this.router.navigate(['/dashboard']);
  }

  isActive(route: string): boolean {
    return this.router.url === route || this.router.url.startsWith(route + '/');
  }

  onToggle(): void {
    this.toggleSidebar.emit();
  }
} 
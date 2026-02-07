import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
    let component: SidebarComponent;
    let fixture: ComponentFixture<SidebarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SidebarComponent],
            imports: [RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(SidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should show dashboard and general items', () => {
        expect(component.filteredNavItems.some(i => i.label === 'Dashboard')).toBeTrue();
        expect(component.filteredNavItems.some(i => i.label === 'Orders')).toBeTrue();
    });

    it('should include admin items (no role filtering)', () => {
        expect(component.filteredNavItems.some(i => i.label === 'Users')).toBeTrue();
        expect(component.filteredNavItems.some(i => i.label === 'Settings')).toBeTrue();
    });
});
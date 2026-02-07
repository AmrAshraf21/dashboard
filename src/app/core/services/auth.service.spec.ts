import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        localStorage.removeItem('currentUser');
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should login as admin with admin credentials', (done) => {
        service.login('admin@example.com', 'admin').subscribe({
            next: (user) => {
                expect(user.role).toBe('admin');
                expect(service.isLoggedIn).toBeTrue();
                done();
            },
            error: () => fail('should not error')
        });
    });

    it('should not login with invalid credentials', (done) => {
        service.login('x', 'y').subscribe({
            next: () => fail('should not succeed'),
            error: (err) => {
                expect(err).toBeTruthy();
                expect(service.isLoggedIn).toBeFalse();
                done();
            }
        });
    });

    it('should logout', (done) => {
        service.login('user@example.com', 'user').subscribe(() => {
            expect(service.isLoggedIn).toBeTrue();
            service.logout();
            expect(service.isLoggedIn).toBeFalse();
            done();
        });
    });
});
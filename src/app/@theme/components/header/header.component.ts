import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';

import {UserData} from '../../../@core/data/users';
import {LayoutService} from '../../../@core/utils';
import {filter, map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {UserApiService} from '../../../@core/service/api-service/user-api.service';
import {AuthService} from '../../../@core/service/auth.service';
import {User} from '../../../@core/model/user';
import {NbTokenService} from '@nebular/auth';
import {RedirectionService} from '../../../@core/service/redirection.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: User;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
    {
      value: 'aquamarine',
      name: 'Aquamarine',
    },
  ];

  currentTheme = 'dark';

  userMenu = [{title: 'Profile'}, {title: 'Log out'}];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private userApiService: UserApiService,
              private tokenService: NbTokenService,
              private redirectionService: RedirectionService,
              private nbMenuService: NbMenuService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.changeTheme(this.currentTheme);
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const {xl} = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({name}) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.loadUserDetails();
    this.tokenService.tokenChange().subscribe(
      value => {
        if (value.getPayload()) {
          this.loadUserDetails();
        } else {
          this.redirectionService.redirectToLogin();
        }
      },
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  loadUserDetails() {
    const keys = Object.keys(localStorage);
    for (const key of keys) {
      // console.log(key);
      // console.log(localStorage.getItem(key));
    }
    this.userApiService.getLoggedInUser().subscribe(
      res => {
        this.user = res;
        this.toggleSidebar();
      },
      err => {
        this.authService.login();
        this.toggleSidebar();
      },
    );
  }
}

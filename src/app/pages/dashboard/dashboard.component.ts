import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ApiService} from '../../@core/service/api-service/api.service';
import {ErrorHandlingService} from '../../@core/service/error-handling.service';
import {Project} from '../../@core/model/project';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  // @ViewChild('uploadBox', {static: false}) uploadBox: TemplateRef<any>;
  allProjects: Project[] = [];

  constructor(private dialogService: NbDialogService,
              private toastrService: NbToastrService,
              private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects() {
    this.apiService.getAllProjects().subscribe(
      res => {
        this.allProjects = res;
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
      },
    );
  }

}

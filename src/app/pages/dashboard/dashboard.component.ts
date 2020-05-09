import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ApiService} from '../../@core/service/api-service/api.service';
import {ErrorHandlingService} from '../../@core/service/error-handling.service';
import {Project} from '../../@core/model/project';
import {ProjectFile} from '../../@core/model/project-file';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('complexityViewer', {static: false}) complexityViewer: TemplateRef<any>;
  allProjects: Project[] = [];
  sourcePathForNewScan: string = '';
  projectKeyForNewScan: string = '';
  loadingNewScan: boolean = false;
  selectedProject: Project = null;
  selectedFile: ProjectFile = null;

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

  startNewScan() {
    this.loadingNewScan = true;
    this.apiService.newScan(this.projectKeyForNewScan, this.sourcePathForNewScan).subscribe(
      res => {
        if (res) {
          this.toastrService.success('Successfully scanned the project', 'Successful!');
          this.sourcePathForNewScan = '';
          this.projectKeyForNewScan = '';
        } else {
          this.toastrService.danger('Scanned failed', 'Failed!');
        }
        this.getAllProjects();
        this.loadingNewScan = false;
      },
      err => {
        ErrorHandlingService.handle(err, this.toastrService);
        this.loadingNewScan = false;
      },
    );
  }

  selectProject(project: Project) {
    this.selectedProject = project;
  }

  selectFile(file: ProjectFile) {
    this.selectedFile = file;
  }

  getFileNameFromPath(relativePath: string) {
    const pieces = relativePath.split(/[\s\\]+/);
    return pieces[pieces.length - 1];
  }

  openComplexityViewerForFile(file: ProjectFile) {
    this.selectFile(file);
    this.dialogService.open(this.complexityViewer);
  }
}

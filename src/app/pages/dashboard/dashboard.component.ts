import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {ApiService} from '../../@core/service/api-service/api.service';
import {ErrorHandlingService} from '../../@core/service/error-handling.service';
import {Project} from '../../@core/model/project';
import {ProjectFile} from '../../@core/model/project-file';
import {Line} from '../../@core/model/line';

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
  filters = {
    showCs: true,
    showCv: true,
    showCm: true,
    showCi: true,
    showCcp: true,
    showCcs: true,
  };
  seeFilters: boolean = false;

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

  selectOptions(showCs: boolean, showCv: boolean, showCm: boolean,
                showCi: boolean, showCcp: boolean, showCcs: boolean) {
    this.filters.showCs = showCs;
    this.filters.showCv = showCv;
    this.filters.showCm = showCm;
    this.filters.showCi = showCi;
    this.filters.showCcp = showCcp;
    this.filters.showCcs = showCcs;
  }

  selectCsOnly() {
    this.selectOptions(true, false, false, false, false, false);
  }

  selectCvOnly() {
    this.selectOptions(false, true, false, false, false, false);
  }

  selectCmOnly() {
    this.selectOptions(false, false, true, false, false, false);
  }

  selectCiOnly() {
    this.selectOptions(false, false, false, true, false, false);
  }

  selectCcpOnly() {
    this.selectOptions(false, false, false, false, true, false);
  }

  selectCcsOnly() {
    this.selectOptions(false, false, false, false, false, true);
  }

  selectAllFilters() {
    this.selectOptions(true, true, true, true, true, true);
  }

  getFileSummary(file: ProjectFile): Line {
    const summaryLine: Line = {ci: 0, cnc: 0, cps: 0, cr: 0, cs: 0, ctc: 0, data: '', lineNo: 0, tw: 0};
    for (const line of file.linesData) {
      summaryLine.cs += line.cs;
      summaryLine.ctc += line.ctc;
      summaryLine.cnc += line.cnc;
      summaryLine.ci += line.ci;
      summaryLine.cps += line.cps;
      summaryLine.tw += line.tw;
      summaryLine.cr += line.cr;
    }
    return summaryLine;
  }

  isAllSelected(): boolean {
    return false;
    // return this.filters.showCs &&
    //   this.filters.showCv &&
    //   this.filters.showCm &&
    //   this.filters.showCi &&
    //   this.filters.showCcp &&
    //   this.filters.showCcs;
  }
}

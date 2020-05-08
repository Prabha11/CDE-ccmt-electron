import {Line} from './line';

export interface ProjectFile {
  relativePath: string;
  linesData: Line[];
  cp: number;
}

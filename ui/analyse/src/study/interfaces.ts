import { Prop } from 'common';
import { NotifCtrl } from './notif';
import { AnalyseData } from '../interfaces';
import { StudyPracticeCtrl } from './practice/interfaces';
import { ChapterDescriptionCtrl } from './chapterDescription';
import GamebookPlayCtrl from './gamebook/gamebookPlayCtrl';
import { GamebookOverride } from './gamebook/interfaces';

export interface StudyCtrl {
  data: StudyData;
  currentChapter(): StudyChapterMeta;
  socketHandlers: { [key: string]: any };
  vm: StudyVm;
  form: any;
  members: any;
  chapters: any;
  notif: NotifCtrl;
  commentForm: any;
  glyphForm: any;
  share: any;
  tags: any;
  desc: ChapterDescriptionCtrl;
  toggleLike(): void;
  position(): Position;
  isChapterOwner(): boolean;
  canJumpTo(path: Tree.Path): boolean;
  onJump(): void;
  withPosition(obj: any): any;
  setPath(path: Tree.Path, node: Tree.Node): void;
  deleteNode(path: Tree.Path): void;
  promote(path: Tree.Path, toMainline: boolean): void;
  setChapter(id: string, force?: boolean): void;
  toggleSticky(): void;
  toggleWrite(): void;
  makeChange(t: string, d: any): boolean;
  startTour(): void;
  userJump(path: Tree.Path): void;
  currentNode(): Tree.Node;
  practice?: StudyPracticeCtrl;
  gamebookPlay(): GamebookPlayCtrl | undefined;
  nextChapter(): StudyChapterMeta | undefined;
  mutateCgConfig(config: any): void;
  isUpdatedRecently(): boolean;
  setGamebookOverride(o: GamebookOverride): void;
  redraw(): void;
}

export type Tab = 'members' | 'chapters';

export interface StudyVm {
  loading: boolean;
  nextChapterId?: string;
  justSetChapterId?: string;
  tab: Prop<Tab>;
  chapterId: string;
  mode: {
    sticky: boolean;
    write: boolean;
  };
  behind: number;
  updatedAt: number;
  gamebookOverride: GamebookOverride;
}

export interface StudyData {
  id: string;
  name: string;
  members: StudyMemberMap;
  position: Position;
  ownerId: string;
  settings: StudySettings;
  visibility: 'public' | 'private';
  createdAt: number;
  from: string;
  likes: number;
  isNew?: boolean
  liked: boolean;
  features: StudyFeatures;
  chapters: StudyChapterMeta[]
  chapter: StudyChapter;
  secondsSinceUpdate: number;
}

export interface StudySettings {
  computer: string;
  explorer: string;
  cloneable: string;
  chat: string;
  sticky: Boolean;
}

export interface ReloadData {
  analysis: AnalyseData;
  study: StudyData;
}

interface Position {
  chapterId: string;
  path: Tree.Path;
}

export interface StudyFeatures {
  cloneable: boolean;
  chat: boolean;
  sticky: boolean;
}

export interface StudyChapterMeta {
  id: string;
  name: string;
}

export interface StudyChapter {
  id: string;
  name: string;
  ownerId: string;
  setup: StudyChapterSetup;
  tags: TagArray[]
  practice: boolean;
  conceal?: number;
  gamebook: boolean;
  features: StudyChapterFeatures;
  description?: string;
}

interface StudyChapterSetup {
  gameId?: string;
  variant: {
    key: string;
    name: string;
  };
  orientation: Color;
  fromFen?: string;
}

interface StudyChapterFeatures {
  computer: boolean;
  explorer: boolean;
}

export type StudyMember = any;

export interface StudyMemberMap {
  [id: string]: StudyMember;
}

export type TagTypes = string[];
export type TagArray = [string, string];

export interface LocalPaths {
  [chapterId: string]: Tree.Path;
}

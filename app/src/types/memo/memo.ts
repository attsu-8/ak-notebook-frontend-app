export interface Memo {
  memoId: string;
  memoTitle: string;
  memoPriority: number;
  memoText: string;
  note: string;
  parentMemoCategory: string;
  childMemoCategory: string;
  purpose: string;
  user: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MemoState {
  editMemo: Memo;
  selectMemo: Memo;
  memoOptions: Memo[];
  memoNextPage: string | null;
  isMemoReflesh: boolean;
  isMemoNextPageLoading: boolean;
  memos: Memo[];
  latestCreateMemo: Memo;
}

export interface MemoFilterProps {
  parentMemoCategoryId: String;
  childMemoCategoryId: String;
}

export interface MemoProps {
  memoTitle: string | null;
  memoPriority: number;
  memoText: string | null;
  note: string;
  parentMemoCategory: string;
  childMemoCategory: string;
  purpose: string | null;
}

export interface memoTitleProps {
  memoId: string;
  memoTitle: string;
}

export interface memoPriorityProps {
  memoId: string;
  memoPriority: number;
}

export interface memoTextProps {
  memoId: string;
  memoText: string;
}

export interface memoPurposeProps {
  memoId: string;
  purpose: string;
}

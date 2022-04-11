import { Memo } from "../memo/memo";
import { Purpose } from "../memo/purpose";

export interface EachNoteLearningEfficiency {
    aggregateDate: Date;
    noteId: string;
    noteName: string;
    noteColor: string;
    averageLearningEfficiencyRate: number;
}

export interface EachParentMemoCategoryLearningEfficiency {
    aggregateDate: Date;
    noteId: string;
    parentMemoCategoryId: string;
    parentMemoCategoryName: string;
    parentMemoCategoryIcon: string;
    averageLearningEfficiencyRate: number;
}

export interface EachMemoLearningEfficiency {
    id: string,
    aggregateDate: Date,
    noteId: string;
    parentMemoCategoryId: string;
    childMemoCategoryId: string;
    childMemoCategoryName: string;
    childMemoCategoryIcon: string;
    memoId: string;
    memoTitle: string;
    learningEfficiencyRate: number;
    elapsedDateCount: number;
}

export interface LearningEfficiencyState {
    todayLearningEfficiency: {
        aggregateDate: Date | "";
        todayLearningEfficiencyRate: number;
        yesterdayLearningEfficiencyRate: number;
    };
    threeMonthAverageLearningEfficiency: {
        threeMonthAverageLearningEfficiencyRateToday: number;
        threeMonthAverageLearningEfficiencyRateYesterday: number;
    };
    eachNoteLearningEfficiency: {
        options: EachNoteLearningEfficiency[];
        selectData: EachNoteLearningEfficiency | null;
    };
    eachParentMemoCategoryLearningEfficiency: {
        options: EachParentMemoCategoryLearningEfficiency[];
        selectData: EachParentMemoCategoryLearningEfficiency | null;
        isFetchData: boolean;
    };
    eachMemoLearningEfficiency: {
        options: EachMemoLearningEfficiency[];
        selectData: EachMemoLearningEfficiency | null;
        isFetchData: boolean;
    };
    selectMemo: Memo;
}

export interface LearningEfficiencyPostData {
    id: string,
    aggregateDate: string,
    learningEfficiencyRate: number;
    note: string;
    parentMemoCategory: string;
    childMemoCategory: string;
    purpose: string;
    memo: string;
}
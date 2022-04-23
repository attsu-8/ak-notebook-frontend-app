export interface Purpose {
  purposeId: string;
  purposeName: string;
  purposeIcon: string | null;
  note: string;
  user: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PurposeProps {
  purposeName: string;
  purposeIcon: string | null;
  note: string;
}

export interface UpdatePurposeProps {
  purposeId: string;
  purposeName: string;
  purposeIcon: string | null;
  note: string;
}

export interface PurposeState {
  editPurpose: PurposeProps | UpdatePurposeProps;
  purposeOptions: Purpose[];
  purposes: Purpose[];
}

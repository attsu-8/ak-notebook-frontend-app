import type { File } from './file';

export interface User {
  profileId: String;
  profileNickname: String;
  userId: String;
  createdAt: String;
  updatedAt: String;
  profileImage: File | null;
}

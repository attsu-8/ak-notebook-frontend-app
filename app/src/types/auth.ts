import type { File } from './file';
import type { User } from './user';

export interface AuthProps {
    userEmail: string;
    password: string;
}

export interface ProfileProps {
    profileId: string;
    profileNickname: string;
    profileImage: File | null;
}

export interface Nickname {
    profileNickname: string;
}

export interface AuthState {
    isInitialized: boolean;
    isAuthenticated: boolean;
    user: User | null;
};
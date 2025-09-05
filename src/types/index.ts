// 공통 타입 정의

// 기본 타입
export type ID = string;
export type DateTime = string;

// 사용자 관련 타입
export interface User {
  id: ID;
  name: string;
  email: string;
  phone?: string;
  profileImage?: string;
  role: 'student' | 'admin';
  createdAt: DateTime;
  lastLoginAt?: DateTime;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
}

// 강의/과정 관련 타입
export interface Course {
  id: ID;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // 시간 단위
  rating: number;
  studentCount: number;
  instructor: string;
  thumbnail?: string;
  price: number;
  tags: string[];
  lectureCount: number; // 총 강의 수
  isPopular?: boolean; // 인기 과정 여부
  hasQuiz?: boolean; // 퀴즈 포함 여부
  hasCertificate?: boolean; // 수료증 발급 여부
  createdAt: DateTime;
  updatedAt: DateTime;
}

export interface Lecture {
  id: ID;
  courseId: ID;
  title: string;
  description: string;
  videoUrl: string;
  duration: number; // 초 단위
  order: number;
  resources?: LectureResource[];
}

export interface LectureResource {
  id: ID;
  type: 'pdf' | 'doc' | 'image' | 'link';
  title: string;
  url: string;
  size?: number;
}

// 학습 진도 관련 타입
export interface Progress {
  id: ID;
  userId: ID;
  courseId: ID;
  lectureId?: ID;
  currentTime: number; // 현재 재생 위치 (초)
  totalTime: number; // 전체 시간 (초)
  completedAt?: DateTime;
  lastWatchedAt: DateTime;
}

export interface CourseProgress {
  courseId: ID;
  userId: ID;
  enrolledAt: DateTime;
  totalLectures: number;
  completedLectures: number;
  totalDuration: number; // 총 강의 시간 (초)
  watchedDuration: number; // 시청한 시간 (초)
  progressPercentage: number; // 진도율 (0-100)
  lastAccessedAt: DateTime;
  isCompleted: boolean;
  completedAt?: DateTime;
}

// 수료증 관련 타입
export interface Certificate {
  id: ID;
  userId: ID;
  courseId: ID;
  courseName: string;
  userName: string;
  instructorName: string;
  certificateNumber: string;
  issuedAt: DateTime;
  completionDate: DateTime;
  totalHours: number;
  templateType: 'basic' | 'premium' | 'professional';
  downloadUrl?: string;
  status: 'active' | 'revoked';
}

export interface CertificateTemplate {
  id: ID;
  name: string;
  type: 'basic' | 'premium' | 'professional';
  description: string;
  previewImage: string;
  isDefault: boolean;
}

// 공지사항/게시글 타입
export interface Notice {
  id: ID;
  title: string;
  content: string;
  category: string;
  important: boolean;
  author: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  viewCount: number;
  attachments?: string[];
}

export interface FAQ {
  id: ID;
  question: string;
  answer: string;
  category: string;
  helpful: number;
  notHelpful: number;
  viewCount: number;
  createdAt: DateTime;
  updatedAt: DateTime;
}

export interface QnA {
  id: ID;
  userId: ID;
  title: string;
  content: string;
  category: 'login' | 'course' | 'technical' | 'other';
  status: 'pending' | 'answered' | 'closed';
  answer?: string;
  answeredBy?: string;
  answeredAt?: DateTime;
  createdAt: DateTime;
  attachments?: string[];
}

// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 필터/검색 타입
export interface CourseFilter {
  category?: string;
  level?: string;
  search?: string;
  sortBy?: 'popular' | 'latest' | 'rating';
  page?: number;
  pageSize?: number;
}

export interface SearchParams {
  query?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}

// 폼 검증 타입
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | undefined;
}

export interface FormErrors {
  [fieldName: string]: string | undefined;
}

// 상태 관리 타입
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface LearningState {
  enrolledCourses: CourseProgress[];
  currentCourse: Course | null;
  currentLecture: Lecture | null;
  progress: { [courseId: string]: Progress[] };
  certificates: Certificate[];
  isLoading: boolean;
  error: string | null;
}

// 비디오 플레이어 타입
export interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  playbackRate: number;
  isLoading: boolean;
  error: string | null;
}

export interface VideoPlayerActions {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;
  setPlaybackRate: (rate: number) => void;
}
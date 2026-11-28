// src/hooks/useApi.js
// Centralized React Query hooks with query keys and API wrappers
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  authAPI,
  opportunitiesAPI,
  internshipAPI,
  profileAPI,
  attendanceAPI,
  chatAPI,
  dashboardAPI,
  tasksAPI,
  companyAdminAPI,
  trainerAPI,
} from '../services/api';

// ─── Query Keys ──────────────────────────────────────────────────────────
export const queryKeys = {
  // Auth
  auth: {
    me: () => ['auth', 'me'],
  },

  // Opportunities
  opportunities: {
    all: () => ['opportunities'],
    available: () => ['opportunities', 'available'],
    details: (id) => ['opportunities', 'details', id],
    internshipDetails: (id) => ['opportunities', 'internship', id],
    myInternships: () => ['opportunities', 'my-internships'],
  },

  // Profile
  profile: {
    me: () => ['profile', 'me'],
    skills: () => ['profile', 'skills'],
  },

  // Attendance
  attendance: {
    me: () => ['attendance', 'me'],
  },

  // Chat
  chat: {
    all: () => ['chat'],
    list: () => ['chat', 'list'],
    messages: (chatId) => ['chat', 'messages', chatId],
  },

  // Dashboard
  dashboard: {
    student: () => ['dashboard', 'student'],
    trainer: () => ['dashboard', 'trainer'],
    companyAdmin: () => ['dashboard', 'company-admin'],
  },

  // Tasks
  tasks: {
    all: () => ['tasks'],
    list: () => ['tasks', 'list'],
    detail: (id) => ['tasks', 'detail', id],
    submission: (id) => ['tasks', 'submission', id],
  },

  // Company Admin
  companyAdmin: {
    dashboard: () => ['company-admin', 'dashboard'],
    opportunities: (page, limit) => ['company-admin', 'opportunities', page, limit],
    trainers: (page, limit) => ['company-admin', 'trainers', page, limit],
  },

  // Trainer
  trainer: {
    internship: (id) => ['trainer', 'internship', id],
    dashboard: () => ['trainer', 'dashboard'],
    students: (page, limit) => ['trainer', 'students', page, limit],
    pendingApplications: (page, limit) => ['trainer', 'pending-applications', page, limit],
    tasks: (page, limit) => ['trainer', 'tasks', page, limit],
  },
};

// ─── Auth Hooks ──────────────────────────────────────────────────────────
// (Login/register are mutations, typically not cached)

// ─── Opportunities Hooks ─────────────────────────────────────────────────
export function useAvailableOpportunities() {
  return useQuery({
    queryKey: queryKeys.opportunities.available(),
    queryFn: () => opportunitiesAPI.getAvailableOpportunities(),
    staleTime: 5 * 60 * 1000, // 5 min
  });
}

export function useOpportunityDetails(opportunityId, enabled = true) {
  return useQuery({
    queryKey: queryKeys.opportunities.details(opportunityId),
    queryFn: () => opportunitiesAPI.getOpportunityDetails(opportunityId),
    enabled: !!opportunityId && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

export function useInternshipDetails(internshipId, enabled = true) {
  return useQuery({
    queryKey: queryKeys.opportunities.internshipDetails(internshipId),
    queryFn: () => opportunitiesAPI.getInternshipDetails(internshipId),
    enabled: !!internshipId && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

export function useMyInternships() {
  return useQuery({
    queryKey: queryKeys.opportunities.myInternships(),
    queryFn: () => opportunitiesAPI.getMyInternships(),
    staleTime: 5 * 60 * 1000,
  });
}

// Mutation: Apply for opportunity
export function useApplyForOpportunity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (opportunityId) => opportunitiesAPI.applyForOpportunity(opportunityId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.opportunities.available() });
      queryClient.invalidateQueries({ queryKey: queryKeys.opportunities.myInternships() });
    },
  });
}

// ─── Profile Hooks ───────────────────────────────────────────────────────
export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile.me(),
    queryFn: () => profileAPI.getProfile(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => profileAPI.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.me() });
    },
  });
}

export function useUploadAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, onProgress }) => profileAPI.uploadAvatar(file, onProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.me() });
    },
  });
}

export function useUploadCV() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ file, onProgress }) => profileAPI.uploadCV(file, onProgress),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.me() });
    },
  });
}

export function useRemoveCV() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => profileAPI.removeCV(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.me() });
    },
  });
}

export function useReuploadVerificationDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file) => profileAPI.reuploadVerificationDocument(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.me() });
    },
  });
}

// Skills
export function useSkills() {
  return useQuery({
    queryKey: queryKeys.profile.skills(),
    queryFn: () => profileAPI.getSkills(),
    staleTime: 10 * 60 * 1000,
  });
}

export function useUpdateSkills() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (skills) => profileAPI.updateSkills(skills),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.skills() });
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.me() });
    },
  });
}

export function useAddSkill() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (skill) => profileAPI.addSkill(skill),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.skills() });
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.me() });
    },
  });
}

export function useRemoveSkill() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (skill) => profileAPI.removeSkill(skill),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.skills() });
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.me() });
    },
  });
}

// ─── Attendance Hooks ────────────────────────────────────────────────────
export function useAttendance() {
  return useQuery({
    queryKey: queryKeys.attendance.me(),
    queryFn: () => attendanceAPI.getAttendance(),
    staleTime: 2 * 60 * 1000, // 2 min for real-time feel
  });
}

export function useCheckIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (internshipId) => attendanceAPI.checkIn(internshipId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.attendance.me() });
    },
  });
}

export function useCheckOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => attendanceAPI.checkOut(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.attendance.me() });
    },
  });
}

// ─── Chat Hooks ──────────────────────────────────────────────────────────
export function useChats() {
  return useQuery({
    queryKey: queryKeys.chat.list(),
    queryFn: () => chatAPI.getChats(),
    staleTime: 2 * 60 * 1000,
  });
}

export function useChatMessages(chatId, enabled = true) {
  return useQuery({
    queryKey: queryKeys.chat.messages(chatId),
    queryFn: () => chatAPI.getChatMessages(chatId),
    enabled: !!chatId && enabled,
    staleTime: 30 * 1000, // 30 sec for messages
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ chatId, messageData }) => chatAPI.sendMessage(chatId, messageData),
    onSuccess: (_, { chatId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.messages(chatId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.list() });
    },
  });
}

export function useMarkChatClosed() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chatId) => chatAPI.markAsClosed(chatId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.list() });
    },
  });
}

// ─── Dashboard Hooks ─────────────────────────────────────────────────────
export function useStudentDashboard() {
  return useQuery({
    queryKey: queryKeys.dashboard.student(),
    queryFn: () => dashboardAPI.getDashboard(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useTrainerDashboard() {
  return useQuery({
    queryKey: queryKeys.dashboard.trainer(),
    queryFn: () => trainerAPI.getDashboard(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCompanyAdminDashboard() {
  return useQuery({
    queryKey: queryKeys.dashboard.companyAdmin(),
    queryFn: () => companyAdminAPI.getDashboard(),
    staleTime: 5 * 60 * 1000,
  });
}

// ─── Tasks Hooks ─────────────────────────────────────────────────────────
export function useTasks() {
  return useQuery({
    queryKey: queryKeys.tasks.list(),
    queryFn: () => tasksAPI.getTasks(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useTask(taskId, enabled = true) {
  return useQuery({
    queryKey: queryKeys.tasks.detail(taskId),
    queryFn: () => tasksAPI.getTask(taskId),
    enabled: !!taskId && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

export function useTaskSubmission(taskId, enabled = true) {
  return useQuery({
    queryKey: queryKeys.tasks.submission(taskId),
    queryFn: () => tasksAPI.getTaskSubmission(taskId),
    enabled: !!taskId && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSubmitTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, file }) => tasksAPI.submitTask(taskId, file),
    onSuccess: (_, { taskId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.submission(taskId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.detail(taskId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.list() });
    },
  });
}

// ─── Company Admin Hooks ─────────────────────────────────────────────────
export function useCompanyAdminOpportunities(page = 1, limit = 10) {
  return useQuery({
    queryKey: queryKeys.companyAdmin.opportunities(page, limit),
    queryFn: () => companyAdminAPI.getOpportunities(page, limit),
    staleTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev, // Keep previous data while fetching
  });
}

export function useCreateOpportunity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => companyAdminAPI.createOpportunity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companyAdmin.opportunities() });
    },
  });
}

export function useUpdateOpportunity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => companyAdminAPI.updateOpportunity(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companyAdmin.opportunities() });
    },
  });
}

export function useDeleteOpportunity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => companyAdminAPI.deleteOpportunity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companyAdmin.opportunities() });
    },
  });
}

export function useCompanyAdminTrainers(page = 1, limit = 10) {
  return useQuery({
    queryKey: queryKeys.companyAdmin.trainers(page, limit),
    queryFn: () => companyAdminAPI.getTrainers(page, limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateTrainer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => companyAdminAPI.createTrainer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.companyAdmin.trainers() });
    },
  });
}

// ─── Trainer Hooks ───────────────────────────────────────────────────────
export function useTrainerInternship(internshipId, enabled = true) {
  return useQuery({
    queryKey: queryKeys.trainer.internship(internshipId),
    queryFn: () => trainerAPI.getInternship(internshipId),
    enabled: !!internshipId && enabled,
    staleTime: 5 * 60 * 1000,
  });
}

export function useTrainerStudents(page = 1, limit = 20) {
  return useQuery({
    queryKey: queryKeys.trainer.students(page, limit),
    queryFn: () => trainerAPI.getMyStudents(page, limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePendingApplications(page = 1, limit = 20) {
  return useQuery({
    queryKey: queryKeys.trainer.pendingApplications(page, limit),
    queryFn: () => trainerAPI.getPendingApplications(page, limit),
    staleTime: 2 * 60 * 1000,
  });
}

export function useApproveApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (applicationId) => trainerAPI.approveApplication(applicationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trainer.pendingApplications() });
      queryClient.invalidateQueries({ queryKey: queryKeys.trainer.students() });
    },
  });
}

export function useRejectApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ applicationId, reason }) => trainerAPI.rejectApplication(applicationId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trainer.pendingApplications() });
    },
  });
}

export function useTrainerTasks(page = 1, limit = 20) {
  return useQuery({
    queryKey: queryKeys.trainer.tasks(page, limit),
    queryFn: () => trainerAPI.getTasks(page, limit),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateTrainerTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => trainerAPI.createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.trainer.tasks() });
    },
  });
}

// ─── Utility: Prefetch Helpers ───────────────────────────────────────────
export function usePrefetch() {
  const queryClient = useQueryClient();

  return {
    prefetchProfile: () =>
      queryClient.prefetchQuery({
        queryKey: queryKeys.profile.me(),
        queryFn: () => profileAPI.getProfile(),
        staleTime: 5 * 60 * 1000,
      }),
    prefetchAvailableOpportunities: () =>
      queryClient.prefetchQuery({
        queryKey: queryKeys.opportunities.available(),
        queryFn: () => opportunitiesAPI.getAvailableOpportunities(),
        staleTime: 5 * 60 * 1000,
      }),
    prefetchStudentDashboard: () =>
      queryClient.prefetchQuery({
        queryKey: queryKeys.dashboard.student(),
        queryFn: () => dashboardAPI.getDashboard(),
        staleTime: 5 * 60 * 1000,
      }),
  };
}

// ─── Cache Invalidation Helpers ──────────────────────────────────────────
export function useInvalidate() {
  const queryClient = useQueryClient();

  return {
    invalidateAll: () => queryClient.invalidateQueries(),
    invalidateAuth: () => queryClient.invalidateQueries({ queryKey: ['auth'] }),
    invalidateOpportunities: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.opportunities.all() }),
    invalidateProfile: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.me() }),
    invalidateAttendance: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.attendance.me() }),
    invalidateChats: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.chat.all() }),
    invalidateTasks: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all() }),
    invalidateDashboard: () =>
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.all() }),
  };
}
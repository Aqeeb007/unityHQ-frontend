import { create } from 'zustand';

interface WorkspaceFormData {
  name: string;
  description: string;
}

interface ModalStore {
  isOpen: boolean;
  formData: WorkspaceFormData;
  openModal: () => void;
  closeModal: () => void;
  setFormData: (data: Partial<WorkspaceFormData>) => void;
  resetFormData: () => void;
}

const initialFormData: WorkspaceFormData = {
  name: '',
  description: '',
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  formData: initialFormData,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetFormData: () => set({ formData: initialFormData }),
}));
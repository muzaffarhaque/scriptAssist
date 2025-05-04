import { create } from 'zustand';
interface AppState {
    count: number;
    isLogin: boolean;
    rocketAllList: any[];
    updatedRocketList: (data: any) => void;
    increase: () => void;
    isLoginHandler: () => void;
  }
export const useAppStore =create<AppState>((set) => (
  {
    count: 0,
    isLogin: false,
    rocketAllList: [],
    updatedRocketList: (data:any) => set(()=>({ rocketAllList: data })),
    isLoginHandler: () => set((state:any) => ({ isLogin: !state.isLogin })),
    increase: () => set((state:any) => ({ count: state.count + 1 })),
  }
));
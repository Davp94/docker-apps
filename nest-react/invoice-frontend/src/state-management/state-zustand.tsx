import { create } from "zustand";


export interface User {
    id:  number;
    name: string;
    email: string;
}

interface UserStore {
    user: User,
    setUser: (payload: User) => void;
    removeUser: () => void;
}

const initialState: User = {
    id: 0,
    name: '',
    email: 'email@email.com'
}

const useUserStore = create<UserStore>((set) => ({
    user: initialState,
    setUser: (payload: User) => set((state) => ({...state, user: payload})),
    removeUser: () => set({user: initialState})
}))

export default useUserStore;
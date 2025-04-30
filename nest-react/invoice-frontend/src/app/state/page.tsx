'use client';
import useUserStore, { User } from '@/state-management/state-zustand';
import { Button } from 'primereact/button';
import { useStore } from 'zustand';

export default function StatePage() {
  //const user = useUserStore((state) => state.user);

  const { user, setUser } = useUserStore();
  const login = () => {
    //TODO Get user from auth
    const retrievedUser: User = {
      id: 123123213,
      name: 'test user',
      email: 'test@test.com',
    };
    setUser(retrievedUser);
  };
  return (
    <>
      {JSON.stringify(user)}
      <Button
        label="Login"
        icon="pi pi-check"
        onClick={() => login()}
      />
    </>
  );
}

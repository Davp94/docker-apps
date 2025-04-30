'use client';
import useUserStore, { User } from '@/state-management/state-zustand';
import { useTheme } from '@/state-management/theme-context';
import { Button } from 'primereact/button';
import { useStore } from 'zustand';

export default function StatePage() {

  const { theme, changeTheme } = useTheme();

  return (
    <>
      <p>Active theme: {theme}</p>
      <Button
        label="Change theme"
        icon="pi pi-check"
        onClick={changeTheme}
      />
    </>
  );
}

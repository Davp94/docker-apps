'use client';
import useUserStore, { User } from '@/state-management/state-zustand';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useStore } from 'zustand';

export default function StatePage() {
  const defaultValues = {
    name: '',
    email: '',
    password: '',
    date: null,
    country: null,
    accept: false,
  };
  const {
    getValues,
    setValue,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm({ defaultValues });

  useEffect(() => {
    //setValue('email', 'test@test.com');
  }, [watch('email')])
  
  return (
    <>
      <form>
        <div className="field">
          <span className="p-float-label">
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Email is required.' }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  autoFocus
                />
              )}
            />
          </span>
        </div>
      </form>
      {JSON.stringify(getValues('email'))}
      <Button
        label="RESET"
        icon="pi pi-check"
        onClick={() => reset()}
      />
    </>
  );
}

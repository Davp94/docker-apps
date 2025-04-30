import { Action } from '@/common/enum/action.enum';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { createCategory, updateCategoryById } from '../service/category.service';
import { Toast } from 'primereact/toast';
import { CreateCategoryDto } from '../method/create-category.dto';

const FormCategoryComponent = ({ action, category, hideDialog, toast }) => {
  const defaultValues = {
    id: 0,
    name: '',
    description: '',
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
    if (action == Action.UPDATE) {
      setValue('id', category.id);
      setValue('description', category.description);
      setValue('name', category.name);
    }
  }, []);

  const onSubmitForm = async dataForm => {
    switch (action) {
      case Action.CREATE:
        const res = await createCategory(dataForm);
        toast.current.show({ severity: 'sucess', summary: 'Created', detail: 'Category Created' });
        hideDialog(true);
        break;
      case Action.UPDATE:
        const createData: CreateCategoryDto = {name: getValues('name'), description: getValues('description')}
        const result = await updateCategoryById(getValues('id'),createData);
        toast.current.show({ severity: 'sucess', summary: 'Updated', detail: 'Category Updated' })
        hideDialog(true);
        break;
      default:
        throw new Error('Operacion no permitida');
    }
  };
  return (
    <>
      <form className="flex w-full" onSubmit={handleSubmit(onSubmitForm)}>
        <div className="surface-card p-4 shadow-2 border-round w-full">
          <div className="text-center mb-5">
            <div className="text-900 text-3xl font-medium mb-3">Category Register</div>
          </div>
          <div className="w-full">
            <span className="p-float-label">
              <Controller
                name="name"
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
          <div className="field">
            <span className="p-float-label">
              <Controller
                name="description"
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
          <div className="flex w-full align-items-end">
            <Button
              type='submit'
              label={action == Action.CREATE ? 'Create' : 'Update'}
              icon="pi pi-check"
            />
            <Button
              label="Cancelar"
              severity='danger'
              icon="pi pi-times"
              onClick={() => hideDialog(false)}
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default FormCategoryComponent;

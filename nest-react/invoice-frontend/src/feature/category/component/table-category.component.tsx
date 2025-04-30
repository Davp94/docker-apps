'use client';

import { findAllCategories, reportCategories } from "../service/category.service";
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import { InputNumber,InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { CategoryDto } from "../method/category.dto";
import { Action } from "@/common/enum/action.enum";
import FormCategoryComponent from "./form-category.component";
import ViewCategoryComponent from "./view-category.component";
let emptyCategory: CategoryDto = {
    id: 0,
    name: '',
    description: ''
 };

//PROP DRILING
const TableCategoryComponent = ({ }) => {
    const [categories, setCategories] = useState<CategoryDto[]>();
    const [action, setAction] = useState<number>(0);
    const [categoryDialog, setCategoryDialog] = useState<boolean>(false);
    const [category, setCategory] = useState<CategoryDto>(emptyCategory);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);
    const initComponent = async () => {
      const response = await findAllCategories();
      setCategories(response);
    //   setCategories([{
    //     id: 1,
    //     name: 'category 1',
    //     description: 'desc category 1'
    //   },
    //   {
    //     id: 2,
    //     name: 'category 2',
    //     description: 'desc category 2'
    //   },
    //   {
    //     id: 3,
    //     name: 'category 3',
    //     description: 'desc category 3'
    //   },
    // ]);
    }
    
    useEffect(() => {
      initComponent();
    }, [])
 
     const openDialog = (action: Action, rowData: CategoryDto | null) => {
         setCategory(rowData);
         setAction(action);
         setCategoryDialog(true);
     };
 
     const hideDialog = async (submitted: boolean = false) => {
         setCategoryDialog(false);
         if(submitted){
            await initComponent();
         }
     };
 
     const startToolbarTemplate = () => {
         return (
             <div className="flex flex-wrap gap-2">
                 <Button label="New" icon="pi pi-plus" severity="success" onClick={() => openDialog(Action.CREATE, null)} />
             </div>
         );
     };
 
     const endToolbarTemplate = () => {
         return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={() => downloadFile()} />;
     };
 
 
     const actionBodyTemplate = (rowData: CategoryDto) => {
         return (
             <div className="flex gap-2">
                 <Button icon="pi pi-eye" rounded outlined severity="info" onClick={() => openDialog(Action.VIEW, rowData)} />
                 <Button icon="pi pi-pencil" rounded outlined severity="warning" onClick={() => openDialog(Action.UPDATE, rowData)} />
                 <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => openDialog(Action.DELETE, rowData)} />
             </div>
         );
     };
 
     const header = (
         <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
             <h4 className="m-0">Manage Categories</h4>
             <IconField iconPosition="left">
                 <InputIcon className="pi pi-search" />
                  <InputText type="search" placeholder="Search..." onInput={(e) => {const target = e.target as HTMLInputElement; setGlobalFilter(target.value);}}  />
             </IconField>
         </div>
     );

     const downloadFile = () => {
        reportCategories().then(res => {
            const url = window.URL.createObjectURL(res);
            window.open(url);
            window.URL.revokeObjectURL(url);
        })
     }
  
    return (
        <div>
        <Toast ref={toast} />
        <div className="card">
            <Toolbar className="mb-4" start={startToolbarTemplate} end={endToolbarTemplate}></Toolbar>

            <DataTable value={categories}
                    dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} categories" globalFilter={globalFilter} header={header}
            >
                <Column field="id" header="Id" sortable></Column>
                <Column field="name" header="Name" sortable></Column>
                <Column field="description" header="Description"></Column>
                <Column header="Action" body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
            </DataTable>
        </div>
        {/* <embed src="blob:http://74.208.201.97:3100/535db5e6-1929-43f0-8a2a-eed947c9fa07" width={500} height={500} type="application/pdf" /> */}
        <Dialog visible={categoryDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Categories Operation" modal className="p-fluid" onHide={hideDialog}>
            {(() => {
                switch(action){
                    case Action.CREATE:
                    case Action.UPDATE:
                            return <FormCategoryComponent category={category} action={action} hideDialog={hideDialog} toast={toast} />
                    case Action.DELETE:
                    case Action.VIEW:
                           return <ViewCategoryComponent category={category} action={action} hideDialog={hideDialog} toast={toast}/>
                    default: 
                        return <div>Operation dont allowed</div>
                }
            })()}
        </Dialog>
    </div>
    );
};

export default TableCategoryComponent;
import { Action } from "@/common/enum/action.enum";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { deleteCategory } from "../service/category.service";

const ViewCategoryComponent = ({ action, category, hideDialog, toast }) => {
  // const deleteProduct = () => {
  //     let _products = products.filter((val) => val.id !== product.id);

  //     setProducts(_products);
  //     setDeleteProductDialog(false);
  //     setProduct(emptyProduct);
  //     toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
  // };
  const deleteCategoryOnView = async () => {
    await deleteCategory(category.id);
    toast.current.show({ severity: 'warning', summary: 'Deleted', detail: 'Category Deleted' })
    hideDialog(true);
  }
  return (
    <>
      <div className="w-full">
          <h3>Category Data</h3>
          <p className="m-0">
            {category.id}
            <br/>
            {category.name}
            <br/>
            {category.description}
          </p>
          <div className="flex w-full align-items-end">
            {action == Action.DELETE && (
              <Button
                label={'Accept'}
                icon="pi pi-check"
                onClick={() => deleteCategoryOnView()}
              />
            )}

            <Button
              label={action == Action.DELETE ? 'Delete' : 'Close'}
              severity="danger"
              icon="pi pi-times"
              onClick={() => hideDialog(false)}
            />
          </div>
      </div>
    </>
  );
};

export default ViewCategoryComponent;
'use client';
import MyComponent from "@/components/my-component";
import IndexCategoryComponent from "@/feature/category/index-category.component";
import { findAllCategories } from "@/feature/category/service/category.service";
import axios from "axios";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  
  return (
    <>
        <IndexCategoryComponent />
    </>
  );
}

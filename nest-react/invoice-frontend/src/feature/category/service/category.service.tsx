import http from "@/service/axios.instance"
import { CreateCategoryDto } from "../method/create-category.dto";


export const findAllCategories = async () => {
    return await http.get('/category').then(
        res => {
            console.log(res)
            return res;
        }
    )
}

export const findCategoryById = async (id: number) => {
    return await http.get(`/category/${id}`).then(
        res => {
            console.log(res)
            return res;
        }
    )
}

export const createCategory = async (categoryDto: CreateCategoryDto) => {
    return await http.post(`/category`, categoryDto).then(
        res => {
            console.log(res)
            return res;
        }
    )
}

export const updateCategoryById = async (id: number, categoryDto: CreateCategoryDto) => {
    return await http.put(`/category/${id}`, categoryDto).then(
        res => {
            console.log(res)
            return res;
        }
    )
}

export const deleteCategory = async (id: number) => {
    return await http.delete(`/category/${id}`).then(
        res => {
            console.log(res);
            return res;
        }
    )
}

export const reportCategories = async () => {
    return await http.get('/category/pdf/report', {responseType: 'blob'}).then(
        res => {
            return res;
        }
    )
}
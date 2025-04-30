import http from "@/service/axios.instance"
import { CreateCategoryDto } from "../method/product.dto";
import { PaginationSortingDto } from "@/common/dto/pagination-sorting.dto";


export const findAllProducts = async () => {
    return await http.get('/product').then(
        res => {
            console.log(res)
            return res;
        }
    )
}

export const findAllProductsPagination = async (paginationSortingDto: PaginationSortingDto) => {
    return await http.get(`/product/pagination`, {params: paginationSortingDto}).then(
        res => {
            console.log(res)
            return res;
        }
    )
}
export interface RespostaPaginada<T> {
    pageNumber: number,
    pageSize: number,
    totalCount: number,
    countOfPage: number,
    data: T[]
}
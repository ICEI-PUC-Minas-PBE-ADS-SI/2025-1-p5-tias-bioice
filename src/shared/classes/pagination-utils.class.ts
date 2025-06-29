export class PaginationUtils {
    static CalcularSkip(pageNumber: number, pageSize: number): number {
        return pageNumber == 1 ? 0 : (pageNumber * pageSize) - 1;
    }
}
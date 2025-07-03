import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@ui/components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/select";

interface PaginationProps {
  /** 当前页索引（从0开始） */
  pageIndex: number;
  /** 总页数 */
  pageCount: number;
  /** 当前页面大小 */
  pageSize: number;
  /** 可选的页面大小选项 */
  pageSizeOptions?: number[];
  /** 是否可以跳转到上一页 */
  canPreviousPage: boolean;
  /** 是否可以跳转到下一页 */
  canNextPage: boolean;
  /** 选中的行数（可选） */
  selectedRowCount?: number;
  /** 总行数（可选） */
  totalRowCount?: number;
  /** 跳转到第一页的回调 */
  onFirstPage: () => void;
  /** 跳转到上一页的回调 */
  onPreviousPage: () => void;
  /** 跳转到下一页的回调 */
  onNextPage: () => void;
  /** 跳转到最后一页的回调 */
  onLastPage: () => void;
  /** 改变页面大小的回调 */
  onPageSizeChange: (pageSize: number) => void;
}

export function Pagination({
  pageIndex,
  pageCount,
  pageSize,
  pageSizeOptions = [10, 20, 25, 30, 40, 50],
  canPreviousPage,
  canNextPage,
  selectedRowCount,
  totalRowCount,
  onFirstPage,
  onPreviousPage,
  onNextPage,
  onLastPage,
  onPageSizeChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="text-muted-foreground flex-1 text-sm">
        {selectedRowCount !== undefined && totalRowCount !== undefined && (
          <>
            {selectedRowCount} of {totalRowCount} row(s) selected.
          </>
        )}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              onPageSizeChange(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue>{pageSize}</SelectValue>
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pageIndex + 1} of {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={onFirstPage}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={onPreviousPage}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={onNextPage}
            disabled={!canNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={onLastPage}
            disabled={!canNextPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

import * as React from "react";
import { Check, ListFilter, X } from "lucide-react";

import { cn } from "@ui/utils";
import { Badge } from "@ui/components/badge";
import { Button } from "@ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@ui/components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/popover";
import { Separator } from "@ui/components/separator";

interface FacetedFilterProps {
  /** 筛选器标题 */
  title?: string;
  /** 筛选选项 */
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
  /** 当前选中的值数组 */
  values: string[];
  /** 值变化回调函数 */
  onValueChange: (values: string[]) => void;
  /** 可选的面统计信息，显示每个选项的数量 */
  facetCounts?: Record<string, number>;
  /** 是否禁用组件 */
  disabled?: boolean;
  /** 搜索占位符文本 */
  searchPlaceholder?: string;
  /** 无结果时的提示文本 */
  emptyText?: string;
  /** 清除筛选器的文本 */
  clearText?: string;
}

export function FacetedFilter({
  title,
  options,
  values = [],
  onValueChange,
  facetCounts,
  disabled = false,
  searchPlaceholder,
  emptyText = "No results found.",
  clearText = "Clear filters",
}: FacetedFilterProps) {
  const selectedValues = new Set(values);

  const handleValueToggle = (value: string) => {
    const newSelectedValues = new Set(selectedValues);

    if (newSelectedValues.has(value)) {
      newSelectedValues.delete(value);
    } else {
      newSelectedValues.add(value);
    }

    const newValues = Array.from(newSelectedValues);
    onValueChange(newValues);
  };

  const handleClearAll = () => {
    onValueChange([]);
  };

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="h-8 border-dashed"
            disabled={disabled}
          >
            <ListFilter />
            {title}
            {selectedValues.size > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal lg:hidden"
                >
                  {selectedValues.size}
                </Badge>
                <div className="hidden gap-1 lg:flex items-center">
                  {selectedValues.size > 2 ? (
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {selectedValues.size} selected
                    </Badge>
                  ) : (
                    options
                      .filter((option) => selectedValues.has(option.value))
                      .map((option) => (
                        <Badge
                          variant="secondary"
                          key={option.value}
                          className="rounded-sm px-1 font-normal"
                        >
                          {option.label}
                        </Badge>
                      ))
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 "
                    render={<span />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearAll();
                    }}
                  >
                    <X className="size-3" />
                  </Button>
                </div>
              </>
            )}
          </Button>
        }
      />
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder || title} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                const count = facetCounts?.[option.value];

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleValueToggle(option.value)}
                  >
                    <div
                      className={cn(
                        "flex size-4 items-center justify-center rounded-[4px] border",
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-input [&_svg]:invisible",
                      )}
                    >
                      <Check className="text-primary-foreground size-3.5" />
                    </div>
                    {option.icon && (
                      <option.icon className="text-muted-foreground size-4" />
                    )}
                    <span>{option.label}</span>
                    {count !== undefined && (
                      <span className="text-muted-foreground ml-auto flex size-4 items-center justify-center font-mono text-xs">
                        {count}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={handleClearAll}
                    className="justify-center text-center"
                  >
                    {clearText}
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

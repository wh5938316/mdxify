import { SetStateAction, atom } from "jotai";

/**
 * 创建一个带防抖功能的 Jotai 原子
 *
 * 该函数返回一组相关的原子，用于管理防抖状态：
 * - debouncedValueAtom: 防抖后的值，写入时会触发防抖逻辑
 * - currentValueAtom: 当前实时值（只读）
 * - isDebouncingAtom: 是否正在防抖中的状态（只读）
 * - clearTimeoutAtom: 清除防抖定时器的操作原子
 * - immediateBounceAtom: 立即更新到最新值的操作原子
 *
 * @param initialValue 初始值
 * @param delayMilliseconds 防抖延迟时间（毫秒），默认 500ms
 * @param shouldDebounceOnReset 重置为初始值时是否也需要防抖，默认 false
 * @returns 包含各种原子的对象
 *
 * @example
 * // 基本用法 - 搜索框防抖
 * const { debouncedValueAtom, currentValueAtom, isDebouncingAtom } = atomWithDebounce('', 500);
 *
 * function SearchComponent() {
 *   const [debouncedValue, setDebouncedValue] = useAtom(debouncedValueAtom);
 *   const currentValue = useAtomValue(currentValueAtom);
 *   const isDebouncing = useAtomValue(isDebouncingAtom);
 *
 *   return (
 *     <div>
 *      <input
 *        value={currentValue}
 *        onChange={(e) => setDebouncedValue(e.target.value)}
 *        placeholder="搜索..."
 *      />
 *      <div>
 *        当前值：{currentValue}
 *        防抖值：{debouncedValue}
 *        是否正在防抖：{isDebouncing ? '是' : '否'}
 *      </div>
 *     </div>
 *   );
 * }
 *
 */
export function atomWithDebounce<T>(
  initialValue: T,
  delayMilliseconds = 500,
  shouldDebounceOnReset = false,
) {
  // 存储当前防抖定时器 ID 的原子
  const prevTimeoutAtom = atom<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  // 注意：不要导出 _currentValueAtom 用于设置状态，这可能导致
  // _currentValueAtom 和 _debouncedValueAtom 之间的状态不一致
  const _currentValueAtom = atom(initialValue);
  _currentValueAtom.debugPrivate = true;

  // 防抖后的值原子（内部使用）
  const _debouncedValueAtom = atom(initialValue);
  _debouncedValueAtom.debugPrivate = true;

  // 是否正在防抖中的状态原子
  const _isDebouncingAtom = atom(false);
  _isDebouncingAtom.debugPrivate = true;

  // 主要的防抖值原子，支持读取和写入
  const debouncedValueAtom = atom(
    // 读取器：返回防抖后的值
    (get) => get(_debouncedValueAtom),
    // 写入器：处理防抖逻辑
    (get, set, update: SetStateAction<T>) => {
      // 清除之前的防抖定时器
      clearTimeout(get(prevTimeoutAtom));

      // 计算新值
      const prevValue = get(_currentValueAtom);
      const nextValue =
        typeof update === "function"
          ? (update as (prev: T) => T)(prevValue)
          : update;

      // 防抖开始时的操作
      const onDebounceStart = () => {
        set(_currentValueAtom, nextValue); // 立即更新当前值
        set(_isDebouncingAtom, true); // 设置防抖状态为 true
      };

      // 防抖结束时的操作
      const onDebounceEnd = () => {
        set(_debouncedValueAtom, nextValue); // 更新防抖后的值
        set(_isDebouncingAtom, false); // 设置防抖状态为 false
      };

      // 立即开始防抖
      onDebounceStart();

      // 特殊处理：如果新值是初始值且不需要对重置进行防抖，则立即结束
      if (!shouldDebounceOnReset && nextValue === initialValue) {
        onDebounceEnd();
        return;
      }

      // 设置防抖定时器
      const nextTimeoutId = setTimeout(() => {
        onDebounceEnd();
      }, delayMilliseconds);

      // 保存定时器 ID，以便后续可能需要清除
      set(prevTimeoutAtom, nextTimeoutId);
    },
  );

  // 导出的原子设置器，用于清除防抖定时器
  const clearTimeoutAtom = atom(null, (get, set, _arg) => {
    clearTimeout(get(prevTimeoutAtom));
    set(_isDebouncingAtom, false);
  });

  // 当前值原子（只读），返回实时的当前值
  const currentValueAtom = atom((get) => get(_currentValueAtom));

  // 是否正在防抖中的状态原子（只读），返回实时的防抖状态
  const isDebouncingAtom = atom((get) => get(_isDebouncingAtom));

  // 只写原子，用于立即跳转到最新值而不等待延迟
  const immediateBounceAtom = atom(null, (get, set) => {
    // 清除定时器和设置防抖状态
    set(clearTimeoutAtom, null);
    // 立即将防抖值更新为当前值
    const currentValue = get(_currentValueAtom);
    set(_debouncedValueAtom, currentValue);
  });

  return {
    currentValueAtom, // 当前实时值（只读）
    isDebouncingAtom, // 是否正在防抖中（只读）
    clearTimeoutAtom, // 清除防抖定时器
    immediateBounceAtom, // 立即更新到最新值
    debouncedValueAtom, // 防抖后的值（主要使用的原子）
  };
}

import { useCallback, useEffect, useRef, useState } from "react";
type IuseThrottle<T> = {
  fn: T;
  delay?: number;
  dependencies?: any[];
};
function useThrottle<T extends Function>(props: IuseThrottle<T>) {
  const { fn, delay = 0, dependencies } = props;
  const [state, setState] = useState(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastExecutedRef = useRef(0);

  const callback: any = useCallback(
    (...args: any[]) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [delay]
  );

  useEffect(() => {
    callback.dependencies = dependencies;
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [callback, dependencies]);

  return callback;
}

export default useThrottle;

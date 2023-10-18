import classNames from "classnames";
type RequestLoaderPorps = IConProps & {
  children?: any;
  isLoading: boolean;
};
export const RequestCircularLoader = (props: RequestLoaderPorps) => {
  const {
    width = 28,
    height = 28,
    children,
    isLoading,
    className = "",

    ...rest
  } = props;
  return isLoading ? (
    <div
      className={classNames(`circular-loader ${className}`, {
        loading: isLoading,
      })}
    >
      <div className="loader loader1">
        <span
          className="loader-box"
          style={{ width: `${width}px`, height: `${height}px` }}
        ></span>
      </div>
    </div>
  ) : children ? (
    children
  ) : null;
};

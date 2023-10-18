import { ReactNode } from "react";

type Props = {
  title?: ReactNode;
};

const Filters = (props: Props) => {
  const { title } = props;
  console.log({ title });
  return <div>Filters</div>;
};

export default Filters;

import { Fragment } from "react";

export const Layout: React.FC = ({ children }) => {
  return (
    <Fragment>
      {/* Add header! */}
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;

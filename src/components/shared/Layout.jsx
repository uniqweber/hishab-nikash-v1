import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <main className="grid grid-cols-[280px_1fr] print:grid-cols-1 max-w-screen-2xl  mx-auto">
        <Sidebar />
        <div className="h-screen overflow-hidden">{children}</div>
      </main>
    </>
  );
};

export default Layout;

import { Route, Routes } from "react-router";
import { routes } from "./routes/routes";
import Layout from "./components/shared/Layout";
/**
 * The main App component, which wraps the BrowserRouter and Routes components from react-router-dom.
 * This component takes the routes array, and maps over it to create a Route for each object in the array.
 * If a route has a subRoute, it will also map over that array to create nested Routes.
 * Finally, the component returns a BrowserRouter component with the Routes component as its only child.
 * @returns {React.ReactElement} The App component.
 */
const App = () => {
  return (
    <Layout>
      <Routes>
        {routes.map(({ path, Element, id, subRoute }) => (
          <Route key={id} path={path} element={<Element />}>
            {subRoute &&
              subRoute.map(({ id, index, path, Element }) => (
                <Route key={id} {...(index ? { index: true } : { path })} element={<Element />}></Route>
              ))}
          </Route>
        ))}
      </Routes>
    </Layout>
  );
};
export default App;

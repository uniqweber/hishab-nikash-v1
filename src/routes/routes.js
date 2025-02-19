import Home from "../pages/home/Home";
import Items from "../pages/items/Items";
import NotFound from "../pages/notFound/NotFound";

export const routes = [
  { id: 1, path: "/", Element: Home },
  { id: 1, path: "/items", Element: Items },
  //   {
  //     id: 2,
  //     path: "",
  //     Element: "",
  //     subRoute: [
  //       { id: 6, index: true, Element: "" },
  //       { id: 6, path: "", Element: "" },
  //       {
  //         id: 7,
  //         path: "",
  //         Element: "",
  //         childrenSubRoute: [
  //           { id: 8, index: true, Element: "" },
  //           { id: 9, path: "", Element: "" },
  //         ],
  //       },
  //     ],
  //   },
  { id: 15, path: "*", Element: NotFound },
];

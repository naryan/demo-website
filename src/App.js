import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/index.jsx";
import Blog from "./pages/blog";
import BlogPost from "./pages/blog-post.jsx";
import ContactUS from "./pages/contact-us";
import AboutUs from "./pages/about-us";
import "./styles/third-party.css";
import "./styles/style.css";
import "./styles/modal.css";
import Main from "./pages/main.jsx";
import Error from "./pages/error.jsx";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={(renderProps) => <Home {...renderProps} />}
        />
        <Route
          exact
          path="/blog"
          render={(renderProps) => <Blog {...renderProps} />}
        />

        <Route
          path="/blog/:uid"
          render={(renderProps) => <BlogPost {...renderProps} />}
        />
        <Route
          exact
          path="/about-us"
          render={(renderProps) => <AboutUs {...renderProps} />}
        />
        <Route
          exact
          path="/contact-us"
          render={(renderProps) => <ContactUS {...renderProps} />}
        />
        <Route
          exact
          path="/*"
          render={(renderProps) => <Main {...renderProps} />}
        />

        <Route
          exact
          path="/teams"
          render={(renderProps) => <Main {...renderProps} />}
        />

        {/* <Route
          exact
          path="/*"
          render={(renderProps) => <Main {...renderProps} />}
        /> */}

        <Route path="*" render={(renderProps) => <Error {...renderProps} />} />
      </Switch>
    </div>
  );
}

export default App;

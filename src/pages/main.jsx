import React from "react";
import Stack from "../sdk/entry";

import Layout from "../components/layout";
import RenderComponents from "../components/render-components";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: undefined,
      entry: undefined,
      header: undefined,
      footer: undefined,
      error: { errorStatus: false, errorCode: undefined, errorData: undefined },
    };
  }

  async componentDidMount() {
    try {
      const result = await Stack.getEntryByUrl(
        "page", 
        this.props.location.pathname, 
        ["page_components.from_blog.featured_blogs",]
        );
      // console.log("databypage", result);
        const page = await Stack.getEntry(
          "page"
        );
      
      // console.log("result", page);

      for (let item of page) {
        for ( let i of item){
          const urls = i;
          this.setState({
            urls: urls

          });
        }
      }
      
      const header = await Stack.getEntry(
        "header",
        "navigation_menu.page_reference"
      );
      console.log("header url", header);
      const footer = await Stack.getEntry("footer");
      this.setState({
        entry: result[0],
        header: header[0][0],
        footer: footer[0][0],
        error: { errorStatus: false },
      });
    } catch (error) {
      this.setState({
        error: { errorStatus: true, errorCode: 404, errorData: error },
      });
    }
  }

  async componentDidUpdate(prevProps){
    try{
      if(prevProps.match.params.uid !== this.props.match.params.uid){
        const result = await Stack.getEntryByUrl(
          "page", 
          this.props.location.pathname, 
          ["page_components.from_blog.featured_blogs",]
          );
        // console.log("databypage", result);
          const page = await Stack.getEntry(
            "page"
          );
      console.log("page info", page);
      
      const header = await Stack.getEntry(
        "header",
        "navigation_menu.page_reference"
      );
      console.log("header url", header);
      const footer = await Stack.getEntry("footer");
      this.setState({
        entry: result[0],
        header: header[0][0],
        footer: footer[0][0],
        error: { errorStatus: false },
      });
      }
    } catch (error) {
      this.setState({
        error: { errorStatus: true, errorCode: 404, errorData: error },
      });
    }
  }

  render() {
    const { header, footer, entry, error } = this.state;
    const { history } = this.props;
    if (!error.errorStatus && entry) {
      return (
        <Layout
          header={header}
          footer={footer}
          page={entry}
          activeTab={entry.title}
        >
          <RenderComponents
            pageComponents={entry.page_components}
            contentTypeUid="page"
            entryUid={entry.uid}
            locale={entry.locale}
          />
        </Layout>
      );
    }
    if (error.errorStatus) {
      history.push("/*", [error]);
    }
    return "";
  }
}
export default Main;

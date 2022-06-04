import React from "react";
import Seo from "../../molecules/Seo"

const PageLayout = (props) => {
  const {
    children,
    pageTitle,
    description,
    url,
    image,
    lang
  } = props;

return (
    <div>
      <Seo
        title={pageTitle}
        description={description}
        url={url}
        image={image}
        lang={lang}
      />
      {children}
    </div>
  );
}
export default PageLayout;
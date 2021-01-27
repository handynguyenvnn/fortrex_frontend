import React from "react";
const __html = require('./index.html.js');
const template = { __html: __html };

const HomePage = () => {
    return (
      <div>
        <span dangerouslySetInnerHTML={template}  />
      </div>
    );
}
export default HomePage;

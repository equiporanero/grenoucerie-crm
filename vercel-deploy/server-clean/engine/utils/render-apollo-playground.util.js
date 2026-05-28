"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "renderApolloPlayground", {
    enumerable: true,
    get: function() {
        return renderApolloPlayground;
    }
});
const renderApolloPlayground = ({ path = 'graphql' } = {})=>{
    return `
    <!DOCTYPE html>
    <html lang="en">
      <body style="margin: 0; overflow-x: hidden; overflow-y: hidden">
      <div id="sandbox" style="height:100vh; width:100vw;"></div>
      <script src="https://embeddable-sandbox.cdn.apollographql.com/_latest/embeddable-sandbox.umd.production.min.js"></script>
      <script>
      new window.EmbeddedSandbox({
        target: "#sandbox",
        // Pass through your server href if you are embedding on an endpoint.
        // Otherwise, you can pass whatever endpoint you want Sandbox to start up with here.
        initialEndpoint: "http://localhost:3000/${path}",
      });
      // advanced options: https://www.apollographql.com/docs/studio/explorer/sandbox#embedding-sandbox
      </script>
      </body>
    </html>`;
};

//# sourceMappingURL=render-apollo-playground.util.js.map
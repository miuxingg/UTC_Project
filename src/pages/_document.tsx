/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable require-jsdoc */
import * as D from 'next/document';
import Document from 'next/document';

import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx: D.DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <D.Html lang="en">
        <D.Head>
          <div>
            <meta charSet="utf-8" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <title>Home | Bookshop Responsive Bootstrap4 Template</title>
            <meta name="description" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            {/* Favicons */}
            <link rel="shortcut icon" href="images/favicon.ico" />
            <link rel="apple-touch-icon" href="images/icon.png" />
            {/* Google font (font-family: 'Roboto', sans-serif; Poppins ; Satisfy) */}
            <link
              href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Poppins:300,300i,400,400i,500,600,600i,700,700i,800"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900"
              rel="stylesheet"
            />
            {/* Stylesheets */}
            <link rel="stylesheet" href="css/bootstrap.min.css" />
            <link rel="stylesheet" href="css/plugins.css" />
            <link rel="stylesheet" href="style.css" />
            {/* Cusom css */}
            <link rel="stylesheet" href="css/custom.css" />
            {/* Modernizer js */}
            <script src="js/vendor/modernizr-3.5.0.min.js"></script>
          </div>
        </D.Head>
        <body>
          <D.Main />
          <D.NextScript />
          <script src="js/vendor/jquery-3.2.1.min.js"></script>
          <script src="js/popper.min.js"></script>
          <script src="js/bootstrap.min.js"></script>
          <script src="js/plugins.js"></script>
          <script src="js/active.js"></script>
        </body>
        {/* <div id="fb-root"></div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.fbAsyncInit = function() {
              FB.init({
                xfbml            : true,
                version          : 'v10.0'
              });
            };
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
            `,
          }}
        />

        <div
          className="fb-customerchat"
          attribution="biz_inbox"
          page_id="1728825687331491"
        ></div> */}
      </D.Html>
    );
  }
}

export default MyDocument;

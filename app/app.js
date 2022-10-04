const express = require('express');
//const router = require('./routers/router');
const videoRouter = require('./routers/videoRouter');
const userRouter = require('./routers/userRouter');
const likeCommentRouter = require('./routers/likeCommentRouter');
const session = require('express-session');
const expressJSDocSwagger = require('express-jsdoc-swagger');
var cors = require('cors')

const options = {
  info: {
    version: '1.0.0',
    title: 'RawTube',
    description: "This is a api for a RowTube.",
    license: {
      name: 'MIT',
    },
  },
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  // Base directory which we use to locate your JSDOC files
  baseDir: __dirname,
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: './**/*.js',
  // URL where SwaggerUI will be rendered
  swaggerUIPath: '/api-docs',
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Expose Open API JSON Docs documentation in `apiDocsPath` path.
  exposeApiDocs: false,
  // Open API JSON Docs endpoint.
  apiDocsPath: '/v3/api-docs',
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
  // You can customize your UI options.
  // you can extend swagger-ui-express config. You can checkout an example of this
  // in the `example/configuration/swaggerOptions.js`
  swaggerUiOptions: {},
  // multiple option in case you want more that one instance
  multiple: true,
};
 
const app = express();
expressJSDocSwagger(app)(options);

const fileUpload = require('express-fileupload');
app.use(fileUpload());

const corsOptions = {
  exposedHeaders: 'Authorization',
};

app.use(cors(corsOptions));

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./public'));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use(router);

app.use(videoRouter);
app.use(userRouter);
app.use(likeCommentRouter);

module.exports = app;

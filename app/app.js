// server.js

// set up ======================================================================
// get all the tools we need
import express  from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import flash    from 'connect-flash'

import morgan       from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser   from 'body-parser'
import cookieSession from 'cookie-session'

// configuration ===============================================================
import routesController from '../controllers/routes'
import authController from '../controllers/authentication'

// load node-red
import RED from 'node-red'

mongoose.Promise = Promise

const app = express()

// set up our express application
app.set('port', process.env.PORT || 3000)
app.use("/",express.static("public")) // server static content from public
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(cookieSession({ name: 'nodered:session', secret: 'Automated WorkFlow !' })); // session secret
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// routes/controllers ==========================================================
app.use(routesController) // Load Get Routes
app.use(authController) // Load Post/Auth Routes

// Setup node-red ==============================================================
const options = {
    httpAdminRoot:"/red",
    httpNodeRoot: "/api",
    // adminAuth: userAuth,
    // userDir:"./users",
    functionGlobalContext: { }    // enables global context
}

RED.init(app,options)

// Serve the editor UI from /red
app.use(options.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(options.httpNodeRoot,RED.httpNode);

// Start the runtime
RED.start();

// Export to server.js =========================================================
export default app

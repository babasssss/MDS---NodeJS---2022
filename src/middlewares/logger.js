/**
 * Middleware to log all requests
 * @param {*} req HTTP Request
 * @param {*} res HTTP Reponse
 * @param {*} next next() middleware function
 */

const loggerMiddleware = (req, res, next) =>{
    if(req)
    {
        //console.info('['+new Date().toLocaleString()+'] Request '+req.method+'from' +req.ip+' to ' + req.url)
        console.info(`[${new Date().toLocaleString()}] Request ${req.method} from ${req.ip} to ${req.url}`)
    }
    next()
}


module.exports = loggerMiddleware
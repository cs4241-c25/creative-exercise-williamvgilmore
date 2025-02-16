const http = require( "node:http" ),
    fs   = require( "node:fs" ),
    mime = require( "mime-types" ),
    dir  = "public/",
    port = 3000

const server = http.createServer( function( request,response ) {
    if( request.method === "GET" ) {
        handleGet( request, response )
    }else if( request.method === "POST" ){
        handlePost( request, response )
    }
})

const handleGet = function( request, response ) {
    const filename = dir + request.url.slice( 1 )

    if( request.url === "/" ) {
        sendFile( response, dir + "index.html" )
    }else{
        sendFile( response, filename )
    }
}

const sendFile = function( response, filename ) {
    const type = mime.lookup( filename ) || 'application/octet-stream'

    fs.readFile( filename, function( err, content ) {
        if( err ) {
            response.writeHead( 404 )
            response.end( "404 Error: File Not Found" )
        } else {
            response.writeHead( 200, { "Content-Type": type })
            response.end( content )
        }
    })
}


server.listen( port || process.env.PORT  )
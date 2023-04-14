# Messenger

Client-server application that provides the user with the basic functionality of any messenger.\
Technology stack:\
-> Front-end: React,\
-> Back-end: Node.js (express), express-ws, express-formable, express-validator and other packages/modules.\
-> DB: MongoDB.\
All the functionality that does not concern chatting works on http, the chat itself is implemented on web sockets.\
Authorization is based on a pair of tokens: access-token (localStorage), refresh-token (cookie, database). To refresh the token, an interceptor is used, written as a wrapper over fetch\
The images required for the UI are stored on the server, the rest of the user's personal settings are stored in the database.\

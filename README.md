# Book-Store Backend
For Project dependecies just write command if node js is installed:
npm install

<b>written following api endpoints for Book crud operation as well as used authentication</b>

Expreess.Router() used when you want to create a new router object in your program to handle requests.
Multiple requests can be easily differentiated with the help of the Router() function in Express.

Admin can sign up and login for creating book and do all the operation:-<br>
Api endpoint : Router.post("/signup",.) for signup as admin.   //http://localhost/admin/signup<br>
Api endpoint : Router.post("/login",.) for login as admin.      //http://localhost/admin/login

Jwt authentication is used for authenticating the valid user to perform operation<br>


<b>Book Crud Operation:</b><br>
Add a new book (title, author, summary):-
Api endpoint : Router.post("/books",.) for creating a book with the required fields.

View a list of all books:-
Api endpoint: Router.get("/books",..) for viwing all the books in the database

View details of a specific book by its ID
Api endpoint: Router.get("/books/:bookId",..) for viwing  the books at specified id in the database


Update a book's details:-
Api endpoint: Router.put("/books/:bookId",..) for updating the book at specified id in the database

Delete a book:-
Api endpoint: Router.delete("/books/:bookId",..) for deleting the book at specified id in the database

Edge cases:-
edge casses like viewing,updating ,deleting the non existing book is also handled.


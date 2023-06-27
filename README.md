# client folder

For client folder, below are the commands that I have used, you may use either yarn or npm method. (I use yarn)

# yarn method

yarn create react-app.

yarn add react-router-dom axios react-cookie

To run the client folder, use the below command,

yarn start

# npm method

npm i create-react-app

npm i react-router-dom axios react-cookie

To run the client folder, use the below command,

npm start


# server folder

For server folder, below are the commands that I have used, you may use either yarn or npm method. (I use yarn)

# yarn method

yarn init

yarn add express cors bcrypt jsonwebtoken mongoose

yarn add --dev nodemon

To run the server folder, use the below command,

node src/index.js

# npm method

npm init

npm i express cors bcrypt jsonwebtoken mongoose

npm i --dev nodemon

To run the server folder, use the below command,

node src/index.js

# setup MongoDB

# 1. Go to MongoDB Atlas
<img width="1470" alt="Screen Shot 2023-06-27 at 2 40 02 PM" src="https://github.com/wingck/capstone/assets/99191737/76ba9a8e-2df5-4ce1-9c52-16e7b4ad4306">
After opening an account, you will see the page above. Click the circled button and click "new project".

# 2. Create a project
<img width="1470" alt="Screen Shot 2023-06-27 at 2 40 09 PM" src="https://github.com/wingck/capstone/assets/99191737/5de379a0-59ee-4812-9752-3cd616b02419">
Create a project name and click "next", I use "test" as an example.

# 3. Create a project (continue)
<img width="1470" alt="Screen Shot 2023-06-27 at 2 43 43 PM" src="https://github.com/wingck/capstone/assets/99191737/fe256a99-8e65-4201-bec9-dfcdbd5f45d7">
No need to change anything, just click "create project".

# 4. Create a database
<img width="1470" alt="Screen Shot 2023-06-27 at 2 44 20 PM" src="https://github.com/wingck/capstone/assets/99191737/cedca2a0-ac23-4022-b96b-b14ae5cdab31">
Click "build a database". If you see a message above saying that "current IP is not added", just click the button "add current IP address".

# 5. Create a database (continue)
<img width="1470" alt="Screen Shot 2023-06-27 at 2 44 57 PM" src="https://github.com/wingck/capstone/assets/99191737/917e90cf-2c0c-4e36-ab6b-dcd9926f99f7">
Choose the free option on the right. For "Provider", choose AWS. Then choose your database name, I use "test" as an example.

# 6 Create a database (continue)
<img width="1470" alt="Screen Shot 2023-06-27 at 2 45 25 PM" src="https://github.com/wingck/capstone/assets/99191737/663eb6b9-6f8d-46a3-8f1f-8e354ed96c43">
Then choose a username and password for your database. Then click "create user".
<img width="1470" alt="Screen Shot 2023-06-27 at 2 45 32 PM" src="https://github.com/wingck/capstone/assets/99191737/842d3775-412e-43ff-a595-0713875e41e3">
Finally just click "finish and close".

# 7 Connect MongoDB Compass to MongoDB Atlas
<img width="1470" alt="Screen Shot 2023-06-27 at 2 47 10 PM" src="https://github.com/wingck/capstone/assets/99191737/7d4543ec-362a-4728-9739-4be3bb86584b">
After finishing the above procedures, you will see this page. A database called "test" has been created and click "connect".

# 8 Connect MongoDB Compass to MongoDB Atlas (continue)
<img width="1470" alt="Screen Shot 2023-06-27 at 2 47 14 PM" src="https://github.com/wingck/capstone/assets/99191737/bbe3ad0d-469f-40aa-a22e-91d33e1e2ec6">
Inside this popup, click "Compass".

# 9 Connect MongoDB Compass to MongoDB Atlas (continue)
<img width="1470" alt="Screen Shot 2023-06-27 at 3 40 49 PM" src="https://github.com/wingck/capstone/assets/99191737/61faa13d-25eb-4fcd-b94e-65dececc21ef">
Copy the circled link.
<img width="1470" alt="Screen Shot 2023-06-27 at 4 05 50 PM" src="https://github.com/wingck/capstone/assets/99191737/5a5eb9dd-2b9b-4a4d-a87e-e0717ca31ff2">
Then open MongoDB Compass and paste it to the URL box.
In my example, my URL is mongodb+srv://ckwwingo:< password >@test.umv80ov.mongodb.net/, where < password > is my database's password. Then click "connect", you will get into the database in MongoDB.

# 10 Connect VS Code with MongoDB
<img width="1470" alt="Screen Shot 2023-06-27 at 2 47 14 PM" src="https://github.com/wingck/capstone/assets/99191737/8bcba7e4-8a37-4ab5-95db-3245100b3399">
Go back to MongoDB Atlas and click the connect button. This time click "Drivers".

# 11 Connect VS Code with MongoDB (continue)
<img width="1470" alt="Screen Shot 2023-06-27 at 3 49 32 PM" src="https://github.com/wingck/capstone/assets/99191737/67647004-f844-4691-bf34-663aaebe97b4">
Copy the circled link.
<img width="1470" alt="Screen Shot 2023-06-27 at 3 45 40 PM" src="https://github.com/wingck/capstone/assets/99191737/96839100-43fb-44e2-afbf-d76b117f7d36">
Go to the file server/src/index.js .Paste the link inside mongoose.connect() on line 16.
In my example, I use the database "test", so my link should be mongodb+srv://ckwwingo:< password >@test.umv80ov.mongodb.net/test?retryWrites=true&w=majority, where < password > is the database's password.
[IMPORTANT] In the above link, you should add database's name before "?retryWrites", my database is "test" so it is "test?retryWrites".
After all the setup, you can run the app using "node src/index.js" in the server folder and "yarn start" in the client folder.

# Video Player #
## Handle Video streaming from local computer##
- - - -
### Requirements ###

* Node.js
* MongoDB
* GitBash
* Sample video for testing

### Setup ###

1. Install Node.js and npm
2. Install Git and Git Bash
3. Install MongoDB
	* Default dbpath for MongoDB is c:\data\db
	* On C disk make a folder called **data** and inside of it folder called **db**
	* Open windows command prompt and navigate to bin folder (Example: C:\Program Files\MongoDB\Server\3.4\bin)
	* Run **mongod.exe**
	* If there is a message „waiting for connection on port 27017“ everything is OK and the server is running.
	* Leave this command prompt open and open Git Bash
4. Inside Git Bash navigate to project folder
5. Run **npm install**
5. Run **node test.js** (This wil add movies from the uploads folder to the database)  
	* to add movies see below - Adding new movies
    * to change the name of the database go to **mongoClient.js** and in **url** write the new name instead of myproject
6. Run **node app.js**
7. Open browser on **localhost:3000**

### Adding new movies ###

* All movies must be in **uploads** folder
* Inside test.js file add movie information following already provided example 
* Run **test.js**
* If adding a new movie later on, drop the database and run **test.js** again

### Fetching the list of all videos in the database ###

Visit url:   
/video/list

- - - -
### Examples ###
![picture alt](http://i65.tinypic.com/25z5w74.jpg "List")
![picture alt](http://i63.tinypic.com/2hdp45c.jpg "Stream")
![picture alt](http://i63.tinypic.com/2qvsjef.jpg "Details")
![picture alt](http://i67.tinypic.com/v5bvw3.jpg "video_list")

# liri-node-app

This command line app allows the user to type in 4 different commands: movie-this, get-my-tweets, spotify-this-song, and do-what-it-says.

The movie-this command requires the user to type in a name of the movie after "movie-this" and will return the movie title, year it was released, the IMDB rating, the Rotten Tomatoes rating, a plot summary, and the actors. If no movie is provided, the argument will default to Mr. Nobody.

"get-my-tweets" will return the users last tweets (with a limit of 20).

"spotify-this-song" requires the user to type in the name of a song after the initial command and then will display the track name, any albums a song by this name appears on, any artists associated with a song by this name, and a 30 second preview of the song (if it exists on spotify). If no song is provided, the argument will default to "The Sign".

"do-what-it-says" will read a text file with the indicated file path and take information before a comma and use it as the command and the information after the comma as the argument and then run the command.

Here's a quick demo: 

[Google Drive Screencast](https://drive.google.com/file/d/1e8lsbLpYutxya9eKZTBMW484I42g18XI/view)
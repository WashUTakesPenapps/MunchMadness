# MunchMadness

## Feature Ideas
  * people submitting restaurant ideas--"group feature"
    * group voting--seeing who voted for what
    * each person can recommend restaurants
    * if not enough for bracket, ask to pull ideas--"what else are you in the mood for?"
    * if the restaurant you recommended got chosen, you get 500 points
    * implement timing system--1 min per round, if you don't complete the round, your vote is not counted
      * group majority wins--every does the rounds together
  * creating users and user accounts--login/register, add favorite restaurants
    * being able to create a group with different users to vote on
    * points system--every time you choose a restaurant, you get 100 points or something
  * integrating with food delivery services, so you can order food directly
    * "reserve" button
    * "food delivery" button--some restaurants only use a certain type of food delivery, link to order online button
    * Google reviews
  * forgoing brackets--get shown two options, choose the winner, winner is kept for the next round
  
## Group Ideas
  * Create a group feature - submit cuisine and stuff (maybe leave cuisine optional?) - if empty string, pull nearest restaurants
  * Piece that creates a room and listens for users to join - Michael 
    * How to keep track of room full (creator could press a button and close the room)
  * Keep track of updates (votes, realtime stuff) - Justin
    * Having two variables that store the votes, increment for each vote (and clear them between rounds)
  * Timer for when votes need to be cast by - Anda
    * If someone didn't vote by the time, vote will not be counted
  * Submitting restaurants? - Yelp API direct business matches? (decrement the number of restaurants we pull randomly)
  
  * Stretch Goals
    * When you join the room, adding a username (like Kahoot) - if we want to keep track of names
    * If users submitted a restaurant, can attach their name with that restaurant - maybe a "spiky circle thing" as andag suggested
    * Other ideas - movies (what's playing?) or tv shows from Netflix/other places, comp sci work...?
    * 8 boxes and you put in 8 things so that you can make a bracket thing for whatever
    * IOS app - Redux? Andag is on it 
  * ~ Design ~ (two different restaurants, swipe it and then a new restaurant would pop up)


## Language Ideas
* Front End: React
* Back End: Node.js, Express
* Database: Firebase

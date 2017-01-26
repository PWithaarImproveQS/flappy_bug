Feature: Choosing your player name
  To support the players in distinguishing between themselves 
  and in order to be able to provide a meaningfull high score board
  players need to choose a name before they can join a game
  
  - Name must be at least one character long
  - Name can be at most eight characters long
  - Name must be unique
  
  If an invalid name is given, a message is displayed "Please choose your name!" and the player remains on this page
  After a valid name is given the player enters the game and the start screen is displayed
  

@injectionserver
Scenario Outline: Choose a unique name is accepted v3
  Given a game with a player called <player1>
  When someone tries to join that game with player name <player2>
  Then the player name is accepted
Examples:
| player1 | player2 |
| Manon | Pieter |
| Hej| ItWorks | 

@injectionserver
Scenario Outline: Choose an existing name is not accepted v3
  Given a game with a player called <player1>
  When someone tries to join that game with player name <player1>
  Then the player name is not accepted
Examples:
| player1 | 
| Manon |
| Hej| 

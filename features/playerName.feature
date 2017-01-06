Feature: Choosing your player name
  To support the players in distinguishing between themselves 
  and in order to be able to provide a meaningfull high score board
  players need to choose a name before they can join a game
  
  - Name must be at least one character long
  - Name must be unique
  
  If an invalid name is given, a message is displayed "Please choose your name!" and the player remains on this page
  After a valid name is given the player enters the game and the start screen is displayed
  
Scenario: Choose a unique name is accepted v1
  Given a started server
    And there already is a player called Pieter in the game
  When I go to the flappy bug url in my web browser
    And I click the name box
    And I remove the text Player_1
    And I enter Manon
    And I press the Play! button
  Then my name is accepted
    And the start screen of flappy bug is shown
    And a bug with my name on it is shown

Scenario: Choose a unique name is accepted v2
  Given a game with a player called Pieter
  When I try to join that game with player name Manon
  Then my name is accepted
  
Scenario: Choose an existing name is not accepted
  Given a game with a player called Pieter
  When I try to join that game with player name Pieter
  Then my name is not accepted
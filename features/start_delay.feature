@normalserver
Feature: Delay of starting the game when players are ready
  To support the players to be able to start a new game
  and in order to give other players the chance to join that game
  there is a ready state for the players that indicated they can play
  
  - In the case of a single player the game start imidiatly
  - In the case of multiple players the game starts when they are all ready
  - In the case of players that are ready and players that are not a timeout exists
  

  Scenario: Start the game imidiatly on ready when there is 1 player
    Given a game with 1 players
    When player 1 is ready
    Then the game starts within 100 milliseconds
    

  Scenario: The game doesn't start when there players not yet ready
    Given a game with 2 players
    When player 1 is ready
    Then the game waits for player 2 to become readyW
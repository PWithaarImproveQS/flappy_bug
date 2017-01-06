Feature: Delay of starting the game when players are ready
  To support the players to be able to start a new game
  and order to give other players the chance to join that game
  There is a ready state for the players that indicated they can player
  
  - In the case of a single player the game start imidiatly
  - In the case of multiple players the game starts when they are all ready
  - In the case of players that are ready and players that are not a timeout exists
  

  Scenario: Start the game imidiatly on ready when there is 1 player
    Given a game with 1 players
    When player 1 is ready
    Then the game starts within 100 milliseconds
    

  Scenario: Start the game with delay on ready when there players not yet ready
    Given a game with 200000000 players
    When player 1 is ready
    Then the game starts within 5000 milliseconds
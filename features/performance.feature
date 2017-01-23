Feature: Performance with multiple payers
  To allow a number of people to join a game
  the game needs to have proper performance with larger numbers of players

  This test runs by default agianst the injectionserver.
  It can be run against the server running on port 8080 to also show and test the effect in the UI
  To do that change the @injectionserver tag to @injectionserver_d and break in the After hook (hooks.js line 61)

@injectionserver
 Scenario: The game can handle a lot of players
     Given a game with 20 players
     When all players are ready
     Then the game starts
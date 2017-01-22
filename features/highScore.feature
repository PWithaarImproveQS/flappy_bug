Feature: Showing high scores in the overview
  To give a good overview of player ranking
  players need to be presented with a high score board
  
- Only one high score per unique player name
- Sort descending on score
- Sort same score ascending on player name

@injectionserver
Scenario: Not overwriting lower score by same player
   Given Pieter has a high score of 5
   When Pieter finishes a game with score 4
   Then the high score overview will show Pieter only once with score 4
   
@injectionserver
Scenario: Overwriting higher score by same player
   Given Pieter has a high score of 5
   When Pieter finishes a game with score 6
   Then the high score overview will show Pieter only once with score 6
   
@injectionserver
Scenario: High score sorting different scores
  Given Pieter has a high score of 200
    And Manon has a high score of 100
    When the high score overview is shown
   Then 200 will be above 100
   
@injectionserver  
Scenario: High score sorting same scores
  Given B has a high score of 10
    And A has a high score of 10
    When the high score overview is shown
   Then A will be listed above B
Feature: Open the application
  As a user
  I want to open the application for the first time
  To begin work

  Scenario:  First time application is open
    Given the application has not been used before
    When I open the application
    Then the default workspace should be shown
    And the workplace should have an new workitem focused
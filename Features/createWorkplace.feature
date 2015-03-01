Feature: Create a workspace
  As a user
  I want to see documents in a workspace
  So that I can organize my thoughts

  Scenario: Create a workitem in a new workspace
    Given a new empty workspace
    When I begin typing a unique string and hit enter
    Then the database will contain the new node
    And a new node will be attached with a title of the unique string
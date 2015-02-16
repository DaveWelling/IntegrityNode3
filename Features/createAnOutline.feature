Feature: Create an workspace
  As a user
  I want to see documents in a workspace
  So that I can organize my thoughts

  Scenario: Create my first workspace
    Given a new empty workspace
    When I begin typing "my new node" and hit enter
    Then a new node will be attached with title "my new node"
    And the database will contain the new node
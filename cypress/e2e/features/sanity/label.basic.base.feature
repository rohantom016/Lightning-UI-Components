@sanity @label @basic @2104361

Feature: LUI Label component

  Background:
    Given I launch the LUI app
    And I navigate to 'Label' 'Label' with 'Base' theme

  Scenario: Verify that the Label Base is displayed
    Then I verify that the 'Label' 'Label' component is displayed

  Scenario: Verify the dimensions of the Label Basic Element
    Then I verify that the 'width' of 'Label' 'Label' component is '77.5px'
    And I verify that the 'height' of 'Label' 'Label' component is '44px'

  Scenario: Verify that Label Basic text can be set
    When I set the 'title' to 'LUI Test' for 'Label' component
    Then I verify that the 'Label' 'Label' component is displayed
    And I verify that 'Label' 'Label' 'Title' has text 'LUI Test'
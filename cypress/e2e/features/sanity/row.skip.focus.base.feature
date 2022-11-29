@sanity @row @skipFocus @2112689

Feature: LUI Row Skip Focus component

  Background:
    Given I launch the LUI app
    And I navigate to 'Row' 'Skip Focus' with 'Base' theme

  Scenario: Verify that Row Skip Focus element is visible
    Then I verify that the 'Row' component is displayed

  Scenario: Verify count of the Row Skip Focus elements
    Then I verify there are 14 assets per row on the 'Row' page

  Scenario Outline: Validate displayed text of buttons
    Then I verify that the '<element>' component on the 'Row' page has text '<text>'
    Examples:
      | element       | text             |
      | Button1Label  | Skip Focus Text  |
      | Button2Label  | Button           |
      | Button3Label  | Button           |
      | Button4Label  | Button           |
      | Button5Label  | Skip Focus Text  |
      | Button6Label  | Button           |
      | Button7Label  | Button           |
      | Button8Label  | Button           |
      | Button9Label  | Skip Focus Text  |
      | Button10Label | Button           |
      | Button11Label | Button           |
      | Button12Label | Button           |
      | Button13Label | Skip Focus Text  |
      | Button14Label | Skip Focus Text  |

  Scenario: Validate navigating the buttons with Skip Focus
    Then I verify that the 'Button2SkipFocus' component on the 'Row' page is in focus
    And I press 'RIGHT' key 3 times
    And I verify that the 'Button6SkipFocus' component on the 'Row' page is in focus
    And I press 'RIGHT' key 3 times
    And I verify that the 'Button10SkipFocus' component on the 'Row' page is in focus
    And I press 'RIGHT' key 3 times
    And I verify that the 'Button12SkipFocus' component on the 'Row' page is in focus
    And I press 'LEFT' key 3 times
    And I verify that the 'Button8SkipFocus' component on the 'Row' page is in focus

  Scenario: Verify the Row Skip Focus 'Wrap Selected' toggle
    Then I verify that the 'Row' 'wrapSelected' state is 'false'
    And I set the 'wrapSelected' to 'true' for 'Row' component
    And I verify that the 'Button2SkipFocus' component on the 'Row' page is in focus
    And I press 'LEFT' key
    And I verify that the 'Button12SkipFocus' component on the 'Row' page is in focus
    And I press 'RIGHT' key
    And I verify that the 'Button2SkipFocus' component on the 'Row' page is in focus
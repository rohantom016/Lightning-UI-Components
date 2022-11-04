@sanity @focusmanager @basic @2110884

Feature: LUI Focus Manager Wrap Selected component

 Background: 
    Given I launch the LUI app 
    When I navigate to 'FocusManager' 'Wrap Selected' with 'Base' theme
  
  Scenario: Verify that FocusManager Wrap Selected Element is visible
    Then I verify that the 'FocusManager' component is displayed
    
  Scenario: Verify the dimensions and count of the FocusManager Wrap Elements
    Then I verify there are 3 assets per row on the 'FocusManager' pagestyle
    And I verify each element has width of 152.0 and height of 42.0 on 'FocusManager' pagestyle
    
  Scenario: Verify row layout and spacing
    Then I verify that elements are horizontally and evenly spaced for 'FocusManager' component
  
  Scenario Outline: Validate displayed text of buttons
    Then I verify that the '<element>' component on the 'FocusManager' page has text '<text>'
    Examples:
      | element         | text   |
      | Button 1 Label  | Left   |
      | Button 2 Label  | Center |
      | Button 3 Label  | Right  |

  # Scenario: Validate navigating the buttons
  #   Then I verify that the 'Button1' component on the 'FocusManager' page is in focus
  #   And I press 'RIGHT' key
  #   And I verify that the 'Button2' component on the 'FocusManager' page is in focus
  #   And I press 'RIGHT' key
  #   And I verify that the 'Button3' component on the 'FocusManager' page is in focus
  #   And I press 'LEFT' key
  #   And I verify that the 'Button2' component on the 'FocusManager' page is in focus
  #   And I press 'LEFT' key
  #   And I verify that the 'Button1' component on the 'FocusManager' page is in focus
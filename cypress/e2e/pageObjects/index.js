import Icon from './elements/icon.element';
import Artwork from './foundations/artwork.foundations';
import Badge from './metadata/badge.metadata';
import Card from './tilesAndCards/card.tilesandcards';
import CardPersonality from './tilesAndCards/cardpersonality.tilesandcards';
import CardSection from './tilesAndCards/cardsection.tilesandcards';
import CardTitle from './tilesAndCards/cardtitle.tilesandcards';
import CheckBox from './elements/checkbox.element';
import Label from './metadata/label.metadata';
import ProgressBar from './utilities/progressbar.utilities';
import FocusManager from './navigation/focusmanager.navigation';
import Radio from './utilities/radio.utilities';
import RadioSmall from './utilities/radiosmall.utilities';
import Row from './navigation/row.navigation';
import Slider from './utilities/slider.utilities';
import SliderLarge from './utilities/sliderlarge.utilities';
import Tile from './tilesAndCards/tile.tilesandcards';
import Button from './controls/button.controls';
import TextBox from './text/textbox.text';
import Toggle from './utilities/toggle.utilities';
import ToggleSmall from './utilities/togglesmall.utilities';
import Distractor from './utilities/distractor.utilities';
import ButtonSmall from './controls/buttonsmall.controls';
import Wave from './utilities/wave.utilities';
import Column from './navigation/column.navigation';
import ListItem from './controls/listitem.controls';
import Control from './controls/control.controls';

export default function getPageObject(pageName) {
  const pageObjects = {
    icon: Icon,
    artwork: Artwork,
    badge: Badge,
    card: Card,
    cardpersonality: CardPersonality,
    cardsection: CardSection,
    cardtitle: CardTitle,
    checkbox: CheckBox,
    label: Label,
    progressbar: ProgressBar,
    radio: Radio,
    radiosmall: RadioSmall,
    row: Row,
    slider: Slider,
    sliderlarge: SliderLarge,
    textbox: TextBox,
    focusmanager: FocusManager,
    tile: Tile,
    button: Button,
    toggle: Toggle,
    togglesmall: ToggleSmall,
    distractor: Distractor,
    buttonsmall: ButtonSmall,
    wave: Wave,
    column: Column,
    listitem: ListItem,
    control: Control
  };

  if (pageName in pageObjects) {
    return pageObjects[pageName];
  } else {
    throw new Error(
      `${pageName} page not found! \nPlease check the page object name or implement the missing case.`
    );
  }
}
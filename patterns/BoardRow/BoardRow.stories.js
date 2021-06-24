import lng from '@lightningjs/core';

import BoardRow from '.';
import mdx from './BoardRow.mdx';
import circle from '../../assets/images/circle.svg';
import Tile from '../../elements/Tile';
import withVibrant from '../../mixins/withVibrant';
import { VerticalCardLarge } from '../../patterns/Card';
import lightningbolt from '../../assets/images/ic_lightning_white_32.png';

export default {
  title: 'Patterns / BoardRow',
  parameters: {
    docs: {
      page: mdx
    }
  }
};

const cardData = {
  logo: lightningbolt,
  data: [
    '86%',
    {
      icon:
        'http://myriad.merlin.comcast.com/select/logo?entityId=8527084350383982239&width=32&height=&ratio=1x1&trim=false',
      title: 'Rotten Tomatoes rating'
    }
  ],
  logoWidth: 1920,
  logoHeight: 1080
};

const getItems = type => {
  return [
    {
      src: `7245349740136736112`,
      title: 'Tenet',
      description:
        'Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.',
      ...cardData,
      onEnter: () => {
        alert('Tenet card onEnter');
      }
    },
    {
      src: `7615274088441709112`,
      title: 'Antebellum',
      description: `Successful author Veronica Henley finds herself trapped in a horrifying reality and must uncover the mind-bending mystery before it's too late.`,
      ...cardData
    },
    {
      src: `4787646614985090112`,
      title: 'Bill & Ted Face the Music',
      logo: lightningbolt,
      description: `Once told they'd save the universe during a time-traveling adventure, 2 would-be rockers from San Dimas, California find themselves as middle-aged dads still trying to crank out a hit song and fulfill their destiny.`,
      ...cardData
    },
    {
      src: '6366577040434117112',
      title: 'Onward',
      description:
        'Two elven brothers embark on a quest to bring their father back for one day.',
      ...cardData
    },
    {
      src: '5879798181352259112',
      title: 'Fear The Walking Dead',
      description:
        'A Walking Dead spinoff set in Los Angeles, California. Follows two families who must band together to survive the undead apocalypse.',
      ...cardData
    },
    {
      src: '6702815185485076112',
      title: 'The New Mutants',
      description: `Five young mutants, just discovering their abilities while held in a secret facility against their will, fight to escape their past sins and save themselves.`,
      ...cardData
    },
    {
      src: '7762245375893944112',
      title: 'Wonder Woman 1984',
      description: `Diana must contend with a work colleague and businessman, whose desire for extreme wealth sends the world down a path of destruction, after an ancient artifact that grants wishes goes missing.`,
      ...cardData
    },
    {
      src: '5369987084856006112',
      title: 'Vikings',
      description: `Vikings transports us to the brutal and mysterious world of Ragnar Lothbrok, a Viking warrior and farmer who yearns to explore - and raid - the distant shores across the ocean.`,
      ...cardData
    },
    {
      src: '7108813814104030112',
      title: 'The Invisible Man',
      description: `When Cecilia's abusive ex takes his own life and leaves her his fortune, she suspects his death was a hoax. As a series of coincidences turn lethal, Cecilia works to prove that she is being hunted by someone nobody can see.`,
      ...cardData
    },
    {
      src: '6030648778584858112',
      title: 'Birds Of Prey',
      description: `After splitting with the Joker, Harley Quinn joins superheroes Black Canary, Huntress and Renee Montoya to save a young girl from an evil crime lord.`,
      ...cardData
    }
  ].map(item => {
    return {
      ...item,
      type: withVibrant(type)
    };
  });
};

// Example of asynchronous callback
function srcCallback({ type, src, w, h }) {
  return new Promise(resolve => {
    let imgSrc, focusSrc;
    if (type.prototype instanceof VerticalCardLarge) {
      imgSrc = `http://myriad.merlin.comcast.com/select/image?entityId=${src}&width=${w}&ratio=3x2`;
    } else {
      imgSrc = `http://myriad.merlin.comcast.com/select/image?entityId=${src}&width=${w}&height=${h}&rule=title`;
      focusSrc = `http://myriad.merlin.comcast.com/select/image?entityId=${src}&width=${w}&height=${h}&rule=noTitle`;
    }

    var img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      resolve({ src: imgSrc, focusSrc });
    };
    img.onerror = () => {
      // Fallback to default aspect ratio if not found
      resolve({
        src: `http://myriad.merlin.comcast.com/select/image?entityId=${src}&width=${w}&ratio=16x9`
      });
    };
  });
}

// Example of synchronous callback
// function srcCallback({ type, src, w, h }) {
//   let imgSrc;
//     if (type.prototype instanceof VerticalCardLarge) {
//       imgSrc = `http://myriad.merlin.comcast.com/select/image?entityId=${src}&width=${w}&ratio=3x2`;
//     } else {
//       imgSrc = `http://myriad.merlin.comcast.com/select/image?entityId=${src}&width=${w}&height=${h}`;
//     }
//     return imgSrc;
// }

export const Basic = args =>
  class Basic extends lng.Component {
    static _template() {
      return {
        BoardRow: {
          type: BoardRow,
          // Menu Card Props
          title: `Today's Top 20`,
          description: `See what's trending in movies and TV today`,
          action: 'View All',
          onEnter: () => {
            alert('View All Action');
          },
          // Row settings
          alwaysScroll: args.alwaysScroll,
          neverScroll: args.neverScroll,
          lazyScroll: args.lazyScroll,
          scrollIndex: args.scrollIndex,
          // Board Row item content
          items: (() => {
            let items;
            switch (args.layout) {
              case 'card':
                items = getItems(VerticalCardLarge);
                break;
              default:
                items = getItems(Tile);
            }
            return items;
          })(),
          // Layout will default to standard if not specified
          layout: args.layout,
          // Boolean to show view all tile at end of board rows. Will not show if onEnter is not specified
          viewAll: args.viewAll,
          // sync or async function that will generate a final src if specified
          srcCallback
        }
      };
    }

    _getFocused() {
      return this.tag('BoardRow');
    }
  };

Basic.argTypes = {
  layout: {
    control: {
      type: 'select',
      options: ['standard', 'hero', 'poster', 'card', 'square', 'squareSmall'],
      defaultValue: 'standard'
    }
  },
  scrollIndex: {
    control: 'number'
  },
  alwaysScroll: {
    control: 'boolean'
  },
  neverScroll: {
    control: 'boolean'
  },
  lazyScroll: {
    control: 'boolean'
  },
  viewAll: {
    control: 'boolean'
  }
};

Basic.parameters = {
  argActions: {}
};
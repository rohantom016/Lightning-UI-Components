﻿/**
 * Copyright 2023 Comcast Cable Communications Management, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import lng from '@lightningjs/core';
import tileImage from '../../assets/images/tile-image.png';
import mdx from './CardContent.mdx';
import { MetadataCardContent as MetadataStory } from '../MetadataCardContent/MetadataCardContent.stories';
import { createModeControl, generateSubStory } from '../../docs/utils';
import CardContentVerticalSmallComponent from './CardContentVerticalSmall';
import { CardContent } from './CardContent.stories';
import { CATEGORIES } from '../../docs/constants';

export default {
  title: `${CATEGORIES[128]}/CardContentVerticalSmall`,
  parameters: {
    docs: {
      page: mdx
    }
  }
};

export const CardContentVerticalSmall = args =>
  class CardContentVerticalSmall extends lng.Component {
    static _template() {
      return {
        CardContentVerticalSmall: {
          type: CardContentVerticalSmallComponent,
          src: tileImage,
          shouldCollapse: args.shouldCollapse
        }
      };
    }
  };

CardContentVerticalSmall.storyName = 'CardContentVerticalSmall';

//Creating a shallow copy of CardContent.args object and removing metadata details property from cardContentArgs
const cardContentArgs = { ...CardContent.args };
delete cardContentArgs.metadata_details;

CardContentVerticalSmall.args = {
  mode: 'focused',
  ...cardContentArgs
};

//Creating a shallow copy of CardContent.argTypes object and removing metadata details property from cardContentArgsTypes
const cardContentArgsTypes = { ...CardContent.argTypes };
delete cardContentArgsTypes.metadata_details;

CardContentVerticalSmall.argTypes = {
  ...createModeControl({ summaryValue: CardContentVerticalSmall.args.mode }),
  ...cardContentArgsTypes
};

CardContentVerticalSmall.parameters = {
  argActions: CardContent.tileProps.argActions('CardContentVerticalSmall')
};

generateSubStory({
  componentName: 'CardContentVerticalSmall',
  baseStory: CardContentVerticalSmall,
  subStory: MetadataStory,
  targetProperty: 'metadata',
  include: ['title', 'description']
});

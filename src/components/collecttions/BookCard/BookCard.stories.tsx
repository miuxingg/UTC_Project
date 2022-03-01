import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import BookCard from '.';
export default {
  title: 'Collections/BookCard',
  component: BookCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof BookCard>;
const Template: ComponentStory<typeof BookCard> = (args) => (
  <BookCard {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

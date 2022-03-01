import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Slider from '.';

export default {
  title: 'Elements/Slider',
  component: Slider,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Slider>;
const Template: ComponentStory<typeof Slider> = (args) => (
  <Slider {...args}></Slider>
);

export const Primary = Template.bind({});
Primary.args = {};

import React from 'react';
import { BooksSection } from '../../components/collecttions';
import MultipleBookSlider from '../../components/collecttions/MultipleBookSlider';
import NewsLetter from '../../components/collecttions/NewsLetter';
import { Slider } from '../../components/collecttions/Slider';
import OurBlog from '../../components/templates/OurBlog';
import { MOCK } from './mock';

const HomePageContainer: React.FC = () => {
  return (
    <>
      <Slider />
      <BooksSection
        listItem={MOCK}
        title="New Products"
        description="There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered lebmid alteration in some ledmid
                form"
      />
      <NewsLetter />

      <MultipleBookSlider
        listItem={MOCK}
        title="All Products"
        description="There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered lebmid alteration in some ledmid
                form"
      />
      <OurBlog />
      <BooksSection
        listItem={MOCK}
        title="Best Seller"
        description="There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered lebmid alteration in some ledmid
                form"
      />
    </>
  );
};

export default HomePageContainer;

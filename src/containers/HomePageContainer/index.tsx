import React from 'react';
import { useSelector } from 'react-redux';
import { BooksSection } from '../../components/collecttions';
import MultipleBookSlider from '../../components/collecttions/MultipleBookSlider';
import NewsLetter from '../../components/collecttions/NewsLetter';
import { Slider } from '../../components/collecttions/Slider';
import OurBlog from '../../components/templates/OurBlog';
import { transformBookCart } from '../../redux/book/dto';
import { newBook } from '../../redux/book/selectors';
import { MOCK } from './mock';

const HomePageContainer: React.FC = () => {
  const newBookSelector = useSelector(newBook);
  return (
    <>
      <Slider />
      <BooksSection
        listItem={transformBookCart(newBookSelector.items)}
        // listItem={MOCK}
        title="New Products"
        description="There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered lebmid alteration in some ledmid
                form"
      />
      <NewsLetter />

      {/* <MultipleBookSlider
        // listItem={transformBookCart(newBookSelector.items)}
        listItem={MOCK}
        title="All Products"
        description="There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered lebmid alteration in some ledmid
                form"
      /> */}
      <OurBlog />
      {/* <BooksSection
        // listItem={transformBookCart(newBookSelector.items)}
        listItem={MOCK}
        title="Best Seller"
        description="There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered lebmid alteration in some ledmid
                form"
      /> */}
    </>
  );
};

export default HomePageContainer;

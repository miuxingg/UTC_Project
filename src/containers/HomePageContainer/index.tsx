import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { BooksSection } from '../../components/collecttions';
import MultipleBookSlider from '../../components/collecttions/MultipleBookSlider';
import NewsLetter from '../../components/collecttions/NewsLetter';
import { Slider } from '../../components/collecttions/Slider';
import OurBlog from '../../components/templates/OurBlog';
import { transformBookCart } from '../../redux/book/dto';
import { newBook } from '../../redux/book/selectors';

const HomePageContainer: React.FC = () => {
  const { t } = useTranslation();
  const newBookSelector = useSelector(newBook);

  return (
    <>
      <Slider />
      <BooksSection
        listItem={transformBookCart(newBookSelector.items)}
        title={t('home.title.newProduct')}
        description="There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered lebmid alteration in some ledmid
                form"
      />
      <NewsLetter />

      <MultipleBookSlider
        listItem={transformBookCart(newBookSelector.items)}
        title={t('home.title.allProduct')}
        description="There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered lebmid alteration in some ledmid
                form"
      />
      <OurBlog />
      <BooksSection
        listItem={transformBookCart(newBookSelector.items)}
        title="Best Seller"
        description="There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered lebmid alteration in some ledmid
                form"
      />
    </>
  );
};

export default HomePageContainer;

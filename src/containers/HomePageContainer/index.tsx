import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { BooksSection } from '../../components/collecttions';
import MultipleBookSlider from '../../components/collecttions/MultipleBookSlider';
import NewsLetter from '../../components/collecttions/NewsLetter';
import { Slider } from '../../components/collecttions/Slider';
import OurBlog from '../../components/templates/OurBlog';
import { transformBookCart } from '../../redux/book/dto';
import {
  allBookByFilter,
  bookBestSaler,
  newBook,
} from '../../redux/book/selectors';

const HomePageContainer: React.FC = () => {
  const { t } = useTranslation();
  const newBookSelector = useSelector(newBook);
  const listBook = useSelector(allBookByFilter);
  const booksBestSaler = useSelector(bookBestSaler);

  return (
    <>
      <Slider />
      <BooksSection
        listItem={transformBookCart(newBookSelector.items)}
        title={t('home.title.newProduct')}
        description={t('home.description.new-product')}
      />
      <NewsLetter />

      <MultipleBookSlider
        listItem={transformBookCart(listBook.items)}
        title={t('home.title.allProduct')}
        description={t('home.description.all-products')}
      />
      <BooksSection
        listItem={transformBookCart(listBook.items)}
        title={t('home.title.combo')}
        description={t('home.description.combo')}
      />
      <OurBlog />
      <BooksSection
        listItem={transformBookCart(booksBestSaler.items)}
        title={t('home.title.best-saler')}
        description={t('home.description.best-saler')}
      />
    </>
  );
};

export default HomePageContainer;

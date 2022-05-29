import React from 'react';

const NewsLetter: React.FC = () => {
  return (
    <section
      className="wn__newsletter__area"
      style={{
        backgroundImage: `url(images/bg/bg2.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-7 offset-lg-5 col-md-12 col-12 ptb--150">
            <div className="section__title text-center">
              <h2>Stay With Us</h2>
            </div>
            <div className="newsletter__block text-center">
              <p>
                Subscribe to our newsletters now and stay up-to-date with new
                collections, the latest lookbooks and exclusive offers.
              </p>
              <form action="#">
                <div className="newsletter__box">
                  <input type="email" placeholder="Enter your e-mail" />
                  <button>Subscribe</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;

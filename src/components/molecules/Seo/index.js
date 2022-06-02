import React from "react";
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

// SEO FC for all dynamic metadata
const Seo = (props) => {
  const {
    url,
    lang,
    image,
    title,
    description,
    keywords
  } = props;

  return (
    <Helmet
      htmlAttributes={{lang}}
      title={title}
      image={image}
      meta={[
        {
          name: 'description',
          content: description
        },
        {
          property: 'og:title',
          content: title
        },
        {
          property: 'og:description',
          content: description
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          name: 'twitter:card',
          content: 'summary'
        },
        {
          name: 'twitter:creator',
          content: 'Komoot'
        },
        {
          name: 'twitter:title',
          content: title
        },
        {
          name: 'twitter:description',
          content: description
        },
        {
          name: 'url',
          content: url
        },
        {
          name: 'keywords',
          content: keywords && keywords.length > 0 ? keywords.join(', ') : []
        }
      ]}
    />
  );
}

// default props
Seo.defaultProps = {
  pageTitle: 'Komoot | Find, plan and share your adventures',
  url: 'https://www.komoot.com/',
  description:
    'Turn your next ride, hike, or run into an adventure with komoot. Get inspired by tapping into shared community knowledge and recommendations, then bring your adventures to life with the easy route planner.',
  image: 'https://www.komoot.com/images/og-images/og-image-default-en.png'
};
// expected prop types
Seo.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  image: PropTypes.string
};


export default Seo;
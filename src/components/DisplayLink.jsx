import React from 'react';
import PropTypes from 'prop-types';
import "../assets/styles/display-link.css";
const DisplayLink = ({  width, height, imageSrc, linkImgSize, title, link, description }) => {
    return (
        <div className="display-link-container" style={{ width, height }}>
            <img src={imageSrc} alt={title} className="link-preview-image" style={{height: linkImgSize, width:linkImgSize}} />
            <div className="link-details">
                <a href={link} target="_blank" rel="noopener noreferrer" className="link-title heading-2">
                    {title}
                </a>
                {description && <p className="link-description body-text-medium">{description}</p>}
            </div>
        </div>
    );
};

DisplayLink.propTypes = {
    height: PropTypes.string,
    width: PropTypes.string,
    linkImgSize: PropTypes.string,
    imageSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string,
};

DisplayLink.defaultProps = {
    height: 'auto',
    width: '100%',
    description: '',
};

export default DisplayLink;
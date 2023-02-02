const { slugify } = require('aql-utils/theme');

function getImage(image, size, variant = false) {
    size = size || '256x256';
    if (image?._id) {
        return {url: `/images/products${variant ? 'Variant' : ''}/${size}/${image._id}/${slugify(image?.title?.toString() || 'no-name')}${image.extension}`, alt: image.alt};
    }
    return '';
}

function getMainImage(images, size, variant = false) {
    size = size || '256x256';
    if (images && images[0]) {
        let image = images.find(ou => ou.default); // Get default image
        if(!image) { // No default ?
            image = images[0]; // Take first image
        }
        return {url: `/images/products${variant ? 'Variant' : ''}/${size}/${image._id}/${slugify(image?.title?.toString() || 'no-name')}${image.extension}`, alt: image.alt};
    }
    return '';
}

function getTabImageURL(images, variant = false) {
    const size    = 'max-100';
    let imagesTab = [];

    for (let index = 0; index < images?.length; index++) {
        const image = images[index];
        imagesTab.push(`/images/products${variant ? 'Variant' : ''}/${size}/${image._id}/${slugify(image?.title?.toString() || 'no-name')}${image.extension}`);
    }

    return imagesTab;
}

function generateSlug({ slug , categorySlugs, canonical }) {
    if (categorySlugs) {
        return `/${categorySlugs.join('/')}/${slug}`;
    } else if (canonical) {
        return canonical;
    } else if (slug) {
        return `/na/${slug}`;
    }
    return '/';
}

module.exports = {
    getImage,
    getMainImage,
    getTabImageURL,
    generateSlug
}
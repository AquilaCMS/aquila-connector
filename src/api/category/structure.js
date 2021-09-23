const defaultPostBody = (type, lang) => {
    switch (type) {
    case 'getCategoryProducts':
        return {
            lang,
            PostBody: {
                filter   : {},
                structure: {
                    slug           : 1,
                    visible        : 1,
                    pos            : 1,
                    stock          : 1,
                    universe       : 1,
                    reviews        : 1,
                    price          : 1,
                    type           : 1,
                    translation    : 1,
                    images         : 1,
                    pictos         : 1,
                    weight         : 1,
                    bundle_sections: 1
                },
                populate: ['bundle_sections.products.id'],
                limit   : 9999,
                page    : 1,
                sort    : {
                    sortWeight: -1
                }
            }
        };
    default:
        return {
            lang,
            withFilter: true,
            PostBody: {
                filter   : {},
                structure: '*',
                populate: { 
                    path: 'children', 
                    match: { active: true, openDate: {$lte: new Date()}, $or: [{closeDate: {$gte: new Date()}}, {closeDate: {$exists: false}}] }
                }
            }
        };
    }
};

module.exports = {
    defaultPostBody
};
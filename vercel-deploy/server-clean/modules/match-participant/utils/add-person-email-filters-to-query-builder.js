"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addPersonEmailFiltersToQueryBuilder", {
    enumerable: true,
    get: function() {
        return addPersonEmailFiltersToQueryBuilder;
    }
});
function addPersonEmailFiltersToQueryBuilder({ queryBuilder, emails, excludePersonIds = [] }) {
    const normalizedEmails = emails.map((email)=>email.toLowerCase());
    queryBuilder = queryBuilder.select([
        'person.id',
        'person.emailsPrimaryEmail',
        'person.emailsAdditionalEmails',
        'person.deletedAt'
    ]).where('LOWER(person.emailsPrimaryEmail) IN (:...emails)', {
        emails: normalizedEmails
    }).withDeleted();
    if (excludePersonIds.length > 0) {
        queryBuilder = queryBuilder.andWhere('person.id NOT IN (:...excludePersonIds)', {
            excludePersonIds
        });
    }
    for (const [index, email] of normalizedEmails.entries()){
        const emailParamName = `email${index}`;
        const orWhereIsInAdditionalEmail = excludePersonIds.length > 0 ? `person.id NOT IN (:...excludePersonIds) AND person.emailsAdditionalEmails @> :${emailParamName}::jsonb` : `person.emailsAdditionalEmails @> :${emailParamName}::jsonb`;
        queryBuilder = queryBuilder.orWhere(orWhereIsInAdditionalEmail, {
            ...excludePersonIds.length > 0 && {
                excludePersonIds
            },
            [emailParamName]: JSON.stringify([
                email
            ])
        });
    }
    queryBuilder = queryBuilder.withDeleted();
    return queryBuilder;
}

//# sourceMappingURL=add-person-email-filters-to-query-builder.js.map
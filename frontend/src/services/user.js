export const User$ = (data) => {
    let attributes = {
        "website": {
            value: ""
        },
        "twitter": {
            value: ""
        }
    };
    if (data?.attributes?.length > 0) {
        data?.attributes?.map(attribute => {
            attributes[attribute.key] = attribute
        });
    }
    return (
        {
            id: data?.id,
            firstName: data?.first_name,
            lastName: data?.last_name,
            name: data?.name,
            handle: data?.handle,
            bio: data?.bio,
            ownedBy: data?.ownedBy
        }
    )
}
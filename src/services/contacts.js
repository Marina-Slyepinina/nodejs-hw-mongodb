import { ContactsCollection } from "../db/models/contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({ page, perPage, sortOrder, sortBy, filter={}, userId }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactsCollection.find({userId});

    if (filter.contactType) {
        contactsQuery.where("contactType").equals(filter.contactType);
    }
    if (filter.isFavourite) {
        contactsQuery.where("isFavourite").equals(filter.isFavourite);
    }

    const contactsCount = await ContactsCollection.countDocuments({ userId, ...filter });

    const contacts = await contactsQuery.skip(skip).limit(limit).sort({[sortBy]: sortOrder}).exec();

    const paginationData = calculatePaginationData(contactsCount, page, perPage);

    return {
        data: contacts,
        ...paginationData,
    };
};


export const getContactById = async (contactId, userId) => {
    const contact = await ContactsCollection.findOne({ _id: contactId, userId });
    return contact;
};


export const createContact = async (payload) => {
    const contact = await ContactsCollection.create(payload);
    return contact;
};


export const updateContact = async (contactId, payload, userId, options = {}) => {
    const contact = await ContactsCollection.findOneAndUpdate(
        { _id: contactId, userId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
    );
        
    return contact;
};


export const deleteContact = async (contactId, userId) => {
    const contact = await ContactsCollection.findOneAndDelete({
        _id: contactId,
        userId,
    });
    return contact;
};
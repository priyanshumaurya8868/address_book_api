import mongoose from 'mongoose';

export interface I_AddressBookDocument extends mongoose.Document {
 name: string;
 place: string;
 phone: string;
}

const AddressBookSchema: mongoose.Schema<I_AddressBookDocument> = new mongoose.Schema({
 name: { type: String },
 place: { type: String },
 phone: { type : String}
});

const AddressBook = mongoose.model<I_AddressBookDocument>('AddressBook', AddressBookSchema);
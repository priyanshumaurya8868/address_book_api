import mongoose from "mongoose";

export interface I_AddressBookDocument extends mongoose.Document {
  user: String | mongoose.Schema.Types.ObjectId | null;
  name: string;
  address: string;
  phone: string;
}

const AddressBookSchema: mongoose.Schema<I_AddressBookDocument> =
  new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String },
    address: { type: String },
    phone: { type: String },
  });

AddressBookSchema.index({ name : 'text'})

const AddressBook = mongoose.model<I_AddressBookDocument>(
  "AddressBook",
  AddressBookSchema
);

AddressBook.createIndexes()
export default AddressBook;

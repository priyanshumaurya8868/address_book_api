import mongoose from "mongoose";

export interface I_AddressBookDocument extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
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

const AddressBook = mongoose.model<I_AddressBookDocument>(
  "AddressBook",
  AddressBookSchema
);
export default AddressBook;

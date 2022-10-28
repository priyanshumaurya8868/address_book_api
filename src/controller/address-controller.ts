import { Request, Response, NextFunction } from "express";
import ApiError from "../error/ApiError";
import * as jwt from "jsonwebtoken";
import AddressBook from "../models/address-book";
import { CustomRequest } from "../middleware/auth-middleware";

export const postAddressBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_data = (req as CustomRequest).token as jwt.JwtPayload;
  const { name, address, phone } = req.body;

  try {
    if (!name) {
      return next(ApiError.badRequest("name cant be left empty!!"));
    }

    if (!address) {
      return next(ApiError.badRequest("adreess cant be left empty!!"));
    }
    if (!phone) {
      return next(ApiError.badRequest("phone cant be left empty!!"));
    }

    const address_book = await new AddressBook({
      user: user_data._id,
      name,
      address,
      phone,
    }).save();

    res.status(201).json({ address_book });
  } catch (error) {
    next(error);
  }
};

export const getmyAddressBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_data = (req as CustomRequest).token as jwt.JwtPayload;
    console.log("fetching address of : " + user_data._id);
    const address_book = await AddressBook.find({ user: user_data._id });
    res.status(200).json({ address_book });
  } catch (error) {
    next(error);
  }
};

export const updateAddressBookEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_data = (req as CustomRequest).token as jwt.JwtPayload;
    const { _id, name, address, phone } = req.body;

    if(!_id){
      return next(ApiError.badRequest("_id is missing in Request body"))
    }

    const toUpdate = await AddressBook.findOne({
      _id: _id,
      user: user_data._id,
    });

    if (!toUpdate) {
      return next(ApiError.resourceNotFound("no Such record exists!"));
    }

    const _name = (name || "").length === 0 ? toUpdate.name : name;

    const _address = (address || "").length === 0 ? toUpdate.address : address;

    const _phone = (phone || "").length === 0 ? toUpdate.phone : phone;

    await AddressBook.findOneAndUpdate(
      { _id: toUpdate._id, user: toUpdate.user },
      { name: _name, address: _address, phone: _phone }
    );

    res.status(200).json({ status: "Success", msg: "Record updated!" });
  } catch (error) {
    next(error);
  }
};

export const deleteEntrybyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_data = (req as CustomRequest).token as jwt.JwtPayload;
  const id = req.params.id || "";

  if (!id) {
    return next(ApiError.badRequest("required pram id is missing!"));
  }

  try {
   const result = await AddressBook.findOneAndDelete({ user: user_data._id, _id: id });
 
   if(!result){
   return next(ApiError.resourceNotFound("no such record exists in your address book!"))
   }

    res.status(200).json({ status: "Success", msg: "Deleted!" });
  } catch (error) {
    next(error);
  }
};

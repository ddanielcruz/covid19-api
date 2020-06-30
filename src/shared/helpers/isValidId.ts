import { Types } from 'mongoose';

export default (id: string | Types.ObjectId): boolean => {
  const isValid = Types.ObjectId.isValid(id);

  if (isValid && typeof id === 'string') {
    return new Types.ObjectId(id).toHexString() === id;
  }

  return isValid;
};

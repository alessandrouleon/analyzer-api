import { Types } from 'mongoose';

export class BaseRepository {
  generateId(id?: string): string {
    if (id) {
      return new Types.ObjectId(id).toString();
    }

    return new Types.ObjectId().toString();
  }
}

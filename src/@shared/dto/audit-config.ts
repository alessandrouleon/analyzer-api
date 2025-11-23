export const SNAP_OPTS = {
  depopulate: true,
  minimize: true,
  versionKey: false,
  virtuals: false,
  transform: (_: any, ret: any) => {
    if (ret?._id) ret._id = String(ret._id);
    return ret;
  },
};

export enum METHOD {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  READ = 'read',
}

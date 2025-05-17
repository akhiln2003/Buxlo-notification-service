import mongoose from "mongoose";

interface NotificationAttributes {
 
}

interface NotificationDocument extends mongoose.Document {
  
}

interface UserModel extends mongoose.Model<NotificationDocument> {
  build(attributes: NotificationAttributes): NotificationDocument;
}

const notificationSchema = new mongoose.Schema(
  {
    
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

notificationSchema.statics.build = (attrs: NotificationAttributes) => {
  return new Notification(attrs);
};

const Notification = mongoose.model<NotificationDocument, UserModel>(
  "Notification",
  notificationSchema
);
export { Notification };

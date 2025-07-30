import mongoose from "mongoose";

// Interface for notification attributes
interface NotificationAttributes {
  recipient: mongoose.Types.ObjectId;
  type: "update" | "warning" | "error" | "success" | "message";
  message: string;
  status: "unread" | "read";
}

// Interface for notification document
interface NotificationDocument extends mongoose.Document {
  recipient: mongoose.Types.ObjectId;
  type: "update" | "warning" | "error" | "success" | "message";
  message: string;
  status: "unread" | "read";
  createdAt: Date;
  updatedAt: Date;
}

// Interface for notification model
interface NotificationModel extends mongoose.Model<NotificationDocument> {
  build(attributes: NotificationAttributes): NotificationDocument;
}

// Notification schema definition
const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["update", "warning", "error", "success" , "message"],
      index: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["unread", "read"],
      default: "unread",
      index: true,
    },
  },
   {
    toJSON: {
      transform(_: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    timestamps: true
  }
);

// Static build method
notificationSchema.statics.build = (attrs: NotificationAttributes) => {
  return new NotificationSchema(attrs);
};

// Create and export the model
const NotificationSchema = mongoose.model<NotificationDocument, NotificationModel>(
  "Notification",
  notificationSchema
);

export { NotificationSchema };

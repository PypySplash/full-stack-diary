import mongoose from "mongoose";

// Create a schema for diaries
const diarySchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    diaryContent: {
      type: String,
      required: true,
    },
    moodSelect: {
      type: String,
      required: true,
    },
    tagSelect: {
      type: String,
      required: true,
    },
    weekday: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true, // 这个选项添加了 createdAt 和 updatedAt 字段
  },
);

// Create a model for diaries
const DiaryModel = mongoose.model("Diary", diarySchema);

export default DiaryModel;

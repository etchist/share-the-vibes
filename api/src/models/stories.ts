import mongoose from 'mongoose';

const storiesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [100, 'Title must be at most 100 characters long'],
    },
    content: {
      type: String,
      required: [true, 'Story needs content'],
      minlength: [20, 'Content must be at least 20 characters long'],
    },
    tags: {
      type: String,
      required: [true, 'At least 1 tag is required'],
    },
  },
  { timestamps: true }
);

const Story = mongoose.model('Story', storiesSchema);

export default Story;

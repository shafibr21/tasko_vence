// models/Task.ts or taskModel.js (depending on your stack)
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      enum: [
        'Arts and Craft',
        'Nature',
        'Family',
        'Sport',
        'Friends',
        'Meditation',
        'Work',
        // add more as needed
      ],
    },
    status: {
      type: String,
      enum: ['Pending', 'Ongoing', 'Collaborative Task', 'Done'],
      default: 'Pending',
    },
    dueDate: {
      type: Date,
    },
    type: {
      type: String,
      enum: ['Personal', 'Collaborative'],
      default: 'Personal',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

export default mongoose.models.Task || mongoose.model('Task', taskSchema);

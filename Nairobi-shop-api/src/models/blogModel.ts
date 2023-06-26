import mongoose, { Schema, Document } from "mongoose";
import slug from 'mongoose-slug-updater'

mongoose.plugin(slug);

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    slug: {
        type: String,
        slug: "title",
        unique: true,
        index: true,
    },
    description: String,
    author: String,
    image: String,
    date: {
        type: Date, // Change the type to Date
        default: Date.now, // Set the default value to the current date and time
        unique: true,
        index: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    }
}, { timestamps: true });

export interface IBlog extends Document {
    title: string;
    description?: string;
    image?: string;
    author?: string;
    status: string;
}

const Blog = mongoose.model<IBlog>("Blog", blogSchema);
export default Blog;

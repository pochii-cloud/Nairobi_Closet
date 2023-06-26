import {Request, Response} from 'express';
import Blog from '../../models/blogModel'
import { unlinkFile } from '../../utils/file';
const getBlogs = async (req: Request, res: Response): Promise<void> => {
    try {
      const blogs = await Blog.find().sort({ _id: -1 });
      res.status(200).send({
        status: true,
        data: blogs,
        message: "Successfully retrieved all blogs.",
      });
    } catch (error) {
      res.status(400).send({
        status: false,
        message: "Something went wrong on blogs.",
      });
    }
  };
  

const addBlog= async (req: Request, res: Response): Promise<void>=>{
    try{
       const {title,description,author,image,status}=req.body; 
       const blog=await Blog.create({title,description,author,image,status})
       res.status(201).json({
        status:true,data:blog,message:"Blog successfully created."
       })
    }
    catch(error){
        if(error.message && error.message.includes("duplicate key error collection")){
            res.status(409).json({message:"Blog with duplicate name.",status:false})
            return;
        }
        
        console.error(error.message);
        res.status(400).json({
            status:false,
            message:"Error occurred while creating blog."
        })
    }
}

const updateBlog= async (req: Request, res: Response): Promise<void>=>{
    try{
        const {title,description,author,image,status}= req.body;
        const blog=await Blog.findByIdAndUpdate(req.params.id,{
            title,description,author,image,status
        },{new:true,upsert:true});
        
        res.status(200).json({
            status:true,message:"Blog successfully updated.",data:blog
        })
    }
    catch(error){
        console.error(error);
        res.status(400).json({status:false,message:"Something went wrong while updating blog."})
    }
}

const deleteBlog= async (req: Request, res: Response): Promise<any>=>{
    try{
        const blog=await Blog.findByIdAndDelete(req.params.id);
        if(blog){
            try{
                if(blog.image){
                    const filePath=blog.image.substring(1);
                    unlinkFile(filePath);
                }
            }
            catch(error){
                console.error(error);
            }
            
            return res.status(200).json({status:true, data:blog,message:"Blog successfully deleted."})
        }
        else{
            return res.status(404).json({status:false,message:"Blog not found"})
        }
    }
    catch(error){
        console.error(error);
        res.status(400).json({status:false,message:"Something went wrong while deleting Blog."})
    }
}

export ={
    getBlogs,
    addBlog,
    updateBlog,
    deleteBlog
}
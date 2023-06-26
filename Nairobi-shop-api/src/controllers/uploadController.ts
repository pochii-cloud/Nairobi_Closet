import { Request, Response } from "express";
import sharp from "sharp";
import { unlinkFile } from "../utils/file";
const uploadImage = async (req: Request, res: Response): Promise<void> => {
    try {
      const file = req.file?.path;
      if (file) {
        try {
          const extension = file.substring(file.lastIndexOf("."));
          const newFile = file.replace(extension, "_opt.png");
          await sharp(file).png({ quality: 75 }).toFile(newFile);
  
          await unlinkFile(file);
          res.status(200).send({
            status: true,
            data: {
              url: `/${newFile}`,
            },
          });
          return;
        } catch (error) {
          console.error(error);
          res.status(500).send({
            status: false,
            error: true,
            message: "Error uploading image",
          });
          return;
        }
      } else {
        console.error(new Error("File not available on path."));
        res.status(409).json({
          status: false,
          message: "Error uploading image",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: false,
        error: true,
        message: "Error uploading image",
      });
    }
  };
  
  const uploadImageResize = async (req: Request, res: Response): Promise<void> => {
    try {
      const file = req.file?.path;
      if (file) {
        try {
          const extension = file.substring(file.lastIndexOf("."));
          const newFile = file.replace(extension, "_opt.png");
          await sharp(file).metadata().then(
            async ({width})=>await sharp(file).resize(width && width > 1600 ? Math.round(width * 0.5) : width)
          .png({ quality: 75 }).toFile(newFile));
  
          await unlinkFile(file);
          res.status(200).send({
            status: true,
            data: {
              url: `/${newFile}`,
            },
          });
          return;
        } catch (error) {
          console.error(error);
          res.status(500).send({
            status: false,
            error: true,
            message: "Error uploading image",
          });
          return;
        }
      } else {
        console.error(new Error("File not available on path."));
        res.status(409).json({
          status: false,
          message: "Error uploading image",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: false,
        error: true,
        message: "Error uploading image",
      });
    }
  };
  const uploadMultiImageResize = async (req: Request, res: Response): Promise<any> => {
    try {
      const reqFiles: Express.Multer.File[] = req.files as Express.Multer.File[];
      const finalUrl = [];
  
      for (let i = 0; i < reqFiles.length; i++) {
        const file = reqFiles[i].path;
        console.log('file', file);
  
        if (file) {
          try {
            finalUrl.push(`/${file}`);
          } catch (error) {
            console.error(error);
            res.status(500).send({
              status: false,
              error: true,
              message: "Error uploading image",
            });
            return;
          }
        } else {
          console.error(new Error("File not available on path."));
          res.status(409).json({
            status: false,
            message: "Error uploading image",
          });
        }
      }
      
      console.log(finalUrl);
  
      res.status(200).send({
        status: true,
        data: {
          url: finalUrl,
        },
      });
      return;
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: false,
        error: true,
        message: "Error uploading image",
      });
    }
  };
  
  const uploadController = {
    uploadImage,
    uploadImageResize,
    uploadMultiImageResize
  };
  
  export default uploadController;
  
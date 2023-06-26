
import { Request, Response } from "express";
import Order, { IOrder } from "../../models/order";
import Product from "../../models/product";
import PDFDocument from 'pdfkit';
import fs from 'fs';
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
host: "smtp.gmail.com",
port: 587,
secure: false,
auth: {
user: "nairobicloset50@gmail.com",
pass: "jcrorngfdagteecz",
},
});

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const sendOrderDeliveredEmail = async (order: IOrder): Promise<void> => {
  const { user, orderItems, _id } = order;

  // Extract the product names, quantities, and prices
  const productDetails = await Promise.all(
    orderItems.map(async (item) => {
      const { name, quantity, price } = await Product.findById(item.product);
      return {
        name,
        quantity,
        price,
      };
    })
  );

  // Calculate the total price
  const totalPrice = productDetails.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  // Create the product details table
  const productsTable = `
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Product</th>
        <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Quantity</th>
        <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Price</th>
      </tr>
      ${productDetails
        .map(
          (item) => `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">Ksh ${item.price.toFixed(2)}</td>
            </tr>
          `
        )
        .join("")}
    </table>
  `;

  const emailOptions = {
    to: user.email,
    from: "samuelnderitu495@gmail.com",
    subject: "Order Delivered - Invoice",
    html: `
      <h2 style="text-align: center;">Nairobi Closet - Order Delivered</h2>
      <div style="text-align: center;">
      <img src="https://scontent-mba1-1.xx.fbcdn.net/v/t39.30808-6/302415021_621273956101569_784365223453290191_n.png?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=d1kEM16ZyqgAX-3ybpE&_nc_ht=scontent-mba1-1.xx&oh=00_AfBGgRcoSrNhiqY0i8yOcjuroE8N1iM5N6tJbTId2lyGow&oe=6491D9AC" alt="Nairobi Closet Logo" style="max-width: 200px; border-radius: 8px;">
    </div>
      <p>Dear ${user.name},</p>
      <p>Your order with Nairobi Closet (Order ID: ${order.orderID}) has been delivered successfully. Here is your order invoice:</p>
      
      <h3>Order Details:</h3>
      <p>Order ID: ${order.orderID}</p>
      <p>Date: ${formatDate(new Date())}</p>
      <h3>Products Delivered:</h3>
      ${productsTable}
      
      <h3>Total Price: Ksh ${totalPrice.toFixed(2)}</h3>
      
      <p>Thank you for choosing Nairobi Closet. If you have any further questions or need assistance, please feel free to contact us.</p>
      
      <p>Best regards,<br>The Nairobi Closet Team</p>
    `,
  };

  transporter.sendMail(emailOptions, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Email sent successfully:", res);
    }
  });
};

const sendOrderCancelledEmail = async (order: IOrder): Promise<void> => {
  const { user, _id } = order;

  const emailOptions = {
    to: user.email,
    from: "samuelnderitu495@gmail.com",
    subject: "Order Cancelled",
    html: `
      <h2 style="text-align: center;">Nairobi Closet - Order Cancelled</h2>
      <div style="text-align: center;">
      <img src="https://scontent-mba1-1.xx.fbcdn.net/v/t39.30808-6/302415021_621273956101569_784365223453290191_n.png?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=d1kEM16ZyqgAX-3ybpE&_nc_ht=scontent-mba1-1.xx&oh=00_AfBGgRcoSrNhiqY0i8yOcjuroE8N1iM5N6tJbTId2lyGow&oe=6491D9AC" alt="Nairobi Closet Logo" style="max-width: 200px; border-radius: 8px;">
    </div>
      <p>Dear ${user.name},</p>
      <p>We regret to inform you that your order with Nairobi Closet (Order ID: ${order.orderID}) has been cancelled.</p>
      <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
      <p>Best regards,</p>
      <p>The Nairobi Closet Team</p>
    `,
  };

  transporter.sendMail(emailOptions, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Email sent successfully:", res);
    }
  });
};

const sendOrderConfirmationEmail = async (order: IOrder): Promise<void> => {
  const { user, orderItems, _id } = order;

  // Extract the product names, quantities, and prices
  const productDetails = await Promise.all(
    orderItems.map(async (item) => {
      const { name, quantity, price } = await Product.findById(item.product);
      return {
        name,
        quantity,
        price,
      };
    })
  );

  // Calculate the total price
  const totalPrice = productDetails.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  // Create the product details table
  const productsTable = `
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Product</th>
        <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Quantity</th>
        <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Price</th>
      </tr>
      ${productDetails
        .map(
          (item) => `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">Ksh ${item.price.toFixed(2)}</td>
            </tr>
          `
        )
        .join("")}
    </table>
  `;

  const emailOptions = {
    to: user.email,
    from: "samuelnderitu495@gmail.com",
    subject: "Order Confirmation - Invoice",
    html: `
      <h2 style="text-align: center;">Nairobi Closet - Order Confirmation</h2>
      <div style="text-align: center;">
      <img src="https://scontent-mba1-1.xx.fbcdn.net/v/t39.30808-6/302415021_621273956101569_784365223453290191_n.png?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=d1kEM16ZyqgAX-3ybpE&_nc_ht=scontent-mba1-1.xx&oh=00_AfBGgRcoSrNhiqY0i8yOcjuroE8N1iM5N6tJbTId2lyGow&oe=6491D9AC" alt="Nairobi Closet Logo" style="max-width: 200px; border-radius: 8px;">
    </div>
    
      <p>Dear ${user.name},</p>
      <p>Thank you for your order with Nairobi Closet! We have received your order (Order ID: ${order.orderID}) and it is being processed as soon as possible. The details of your order are as follows:</p>
      
      <h3>Order Details:</h3>
      <p>Order ID: ${order.orderID}</p>
      <p>Date: ${formatDate(new Date())}</p>
      <h3>Products Ordered:</h3>
      ${productsTable}
      
      <h3>Total Price: ksh ${totalPrice.toFixed(2)}</h3>
      
      <p>Please note that Nairobi Closet will contact you to provide updates on the status of your order and notify you when it is dispatched. We appreciate your patience and support.</p>
      
      <p>If you have any further questions or need assistance, please feel free to contact us. Thank you for choosing Nairobi Closet!</p>
      
      <p>Best regards,<br>The Nairobi Closet Team</p>
    `,
  };

  transporter.sendMail(emailOptions, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Email sent successfully:", res);
    }
  });
};


const getOrders = async (req: Request, res: Response): Promise<void> => {
try {
const orders = await Order.find({})
.sort({ createdAt: -1 })
.populate("user", "_id name email phone")
.lean();res.status(200).json({
  status: true,
  message: "Successfully fetched orders.",
  data: orders,
});
} catch (error) {
  res.status(400).json({
  status: false,
  message: error.message,
  });
  }
  };




  const getOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const order = await Order.findById(req.params.id)
        .populate("user", "_id name")
        .populate("product")
        .lean();
  
      if (order) {
        // Access the values of colors and sizes
        const updatedOrder = {
          ...order,
          orderItems: order.orderItems.map((item: any) => ({
            ...item,
            colors: item.colors && item.colors.join(", "), // Convert colors array to string
            sizes: item.sizes && item.sizes.join(", "), // Convert sizes array to string
          })),
        };
  
        res.status(200).json({
          status: true,
          message: "Successfully get the order",
          data: updatedOrder,
        });
      } else {
        res.status(404).json({ status: false, message: "Order not found." });
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };
  
  
//   const getOrder = async (req: Request, res: Response): Promise<void> => {
//   try {
//   const order = await Order.findById(req.params.id)
//   .populate("user", "_id name")
//   .populate("product")
//   .lean();if (order) {
//     res.status(200).json({
//       status: true,
//       message: "Successfully get the order",
//       data: order,
//     });
//   } else {
//     res.status(404).json({ status: false, message: "Order not found." });
//   }
//   if (order) {
//     res.status(200).json({
//       status: true,
//       message: "Successfully get the order",
//       data: order,
//     });
//   } else {
//     res.status(404).json({ status: false, message: "Order not found." });
//   }
// } catch (error) {
//   res.status(400).json({
//   status: false,
//   message: error.message,
//   });
//   }
//   };
  
  const updateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const { orderStatus } = req.body;
      const orderId = req.params.id;
      const prevOrder = await Order.findById(orderId);
  
      if (!prevOrder) {
        res.status(404).json({
          status: false,
          message: "Order not found.",
        });
        return;
      }
  
      if (
        prevOrder?.paymentStatus !== "paid" &&
        orderStatus === "processing"
      ) {
        // Code for processing stage
  
        const paidAt = new Date();
        const paymentStatus = "paid";
  
        const { orderItems } = prevOrder;
  
        // Rest of the code...
  
        const order = await Order.findByIdAndUpdate(
          req.params.id,
          { paidAt, paymentStatus, orderStatus },
          { new: true }
        ).populate("user", "_id name email phone");
  
        // Send order confirmation email
        sendOrderConfirmationEmail(order);
  
        res.status(200).json({
          status: true,
          message: "Order updated successfully.",
          data: order,
        });
  
        return;
      } else if (
        (prevOrder?.orderStatus === "processing" && orderStatus === "delivered") ||
        (prevOrder?.orderStatus === "cancelled" && orderStatus === "delivered")
      ) {
        // Code for order delivered
        const order = await Order.findByIdAndUpdate(
          req.params.id,
          { orderStatus },
          { new: true }
        ).populate("user", "_id name email phone");
  
        // Send order delivered email
        sendOrderDeliveredEmail(order);
  
        // Send order cancellation email
        if (orderStatus === "cancelled") {
          sendOrderCancelledEmail(order);
        }
  
        res.status(200).json({
          status: true,
          message: "Order updated successfully.",
          data: order,
        });
  
        return;
      } else {
        // Code for other stages (e.g., payment status update)
  
        const paidAt = prevOrder.paidAt ? prevOrder.paidAt : new Date();
  
        const order = await Order.findByIdAndUpdate(
          req.params.id,
          { paidAt, orderStatus },
          { new: true }
        ).populate("user", "_id name email phone");
  
        // Send order cancellation email
        if (orderStatus === "cancelled") {
          sendOrderCancelledEmail(order);
        }
  
        res.status(200).json({
          status: true,
          message: "Order updated successfully.",
          data: order,
        });
  
        return;
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "Something went wrong. Please try again.",
      });
    }
  };
  
  
  const deleteOrder = async (req: Request, res: Response): Promise<any> => {
  try {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (order) {
  return res.status(200).json({
  status: true,
  message: "Order deleted successfully.",
  data: order,
  });
  }
  return res
  .status(404)
  .json({ status: false, message: "Order not found." });
  } catch (error) {
  res.status(400).json({
  status: false,
  message: "Something went wrong. Please try again.",
  });
  }}

  const getOrderInvoice = async (req: Request, res: Response): Promise<void> => {
    try {
      const order = await Order.findById(req.params.id)
        .populate("user", "_id name email")
        .populate("orderItems.product", "name price")
        .lean();
  
      if (!order) {
        res.status(404).json({
          status: false,
          message: "Order not found.",
        });
        return;
      }
  
      // Create a document
      const doc = new PDFDocument();
  
      // Set response headers
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${order._id}.pdf`
      );
  
      // Pipe the PDF document to the response stream
      doc.pipe(res);
  
      // Set fonts
      doc.font("Helvetica-Bold");
      doc.fontSize(14);
  
      // Nairobi Closet logo
      // doc.image("https://example.com/nairobi-closet-logo.png", 50, 50, {
      //   width: 150,
      // });
  
      // Invoice title and heading
      doc.fontSize(18).text("Invoice", { align: "right" });
      doc.fontSize(24).text("Nairobi Closet", { align: "right" });
  
      // Invoice information
      const currentDate = new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      doc.moveDown();
      doc.text(`Invoice Date: ${currentDate}`, { align: "right" });
      doc.text(`Order ID: ${order._id}`, { align: "right" });
  
      // User information
      doc.moveDown();
      doc.font("Helvetica-Bold").text("Customer Information:");
      doc.font("Helvetica").text(`Name: ${order.user.name}`);
      doc.text(`Email: ${order.user.email}`);
  
      // Order items table
      doc.moveDown();
      doc.font("Helvetica-Bold").text("Order Items:");
      doc.moveDown();
  
      // Table headers
      doc.font("Helvetica-Bold");
      doc.text("No.", { width: 50, align: "left" });
      doc.text("Product Name", { width: 250, align: "left" });
      doc.text("Price", { width: 100, align: "right" });
  
      // Table rows
      doc.font("Helvetica");
      order.orderItems.forEach((item: any, index: number) => {
        doc.text(`${index + 1}.`, { width: 50, align: "left" });
        doc.text(item.product.name, { width: 250, align: "left" });
        doc.text(`$${item.product.price}`, { width: 100, align: "right" });
      });
  
      // Total price
      doc.moveDown();
      const totalPrice = order.orderItems.reduce(
        (total: number, item: any) => total + item.product.price,
        0
      );
      doc.font("Helvetica-Bold");
      doc.text("Total", { width: 300, align: "left" });
      doc.text(`$${totalPrice}`, { width: 100, align: "right" });
  
      // Thank you message
      doc.moveDown();
      doc.font("Helvetica-Bold").fontSize(16).text("Thank you for shopping at Nairobi Closet!", {
        align: "center",
      });
  
      // Finalize the PDF document
      doc.end();
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Something went wrong. Please try again.",
    });
  }
};

 
  export = {
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  getOrderInvoice,
  };      
      
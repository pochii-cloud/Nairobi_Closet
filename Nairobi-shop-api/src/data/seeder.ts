import db from "../models";
import users from "./users";
import User from "../models/user";
import Settings from "../models/settings";

db.once("open", function () {
  console.log("Connected to MongoDB database");
});

const seedData = async () => {
  try {
    await User.deleteMany({
      email: {
        $in: ["admin@gmail.com", "user@gmail.com"],
      },
    });

    await User.insertMany(users);
    await Settings.create({
      site_name:"Nairobi Closet",
      site_keywords:"Online shoes shopping",
      site_description:"Online Shopping Description",
      logo:"logo.png",
      favicon:"",
      email:"nairobicloset50@gmail.com",
      phone:"0741515192",
      address:"Nairobi, Kenya",
      symbol:"ksh",
      copyright:"Copyright © 2023 All Rights Reserved.",
      facebookUrl:"https://www.facebook.com",
      instagramUrl:"https://instagram.com",
      linkedinUrl:"https://linkedin.com",
      twitterUrl:"https://twitter.com"
    });
    console.log("Users seeded successfully.");
    console.log("Seed completed.");
    
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await User.deleteMany({
      email: {
        $in: ["admin@gmail.com", "user@gmail.com"],
      },
    });

    console.log("Users Destroyed!");

    console.log("Destroy completed.");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  seedData();
}

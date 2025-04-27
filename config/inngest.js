import { Inngest } from "inngest"; 
import { connectDB } from "./db"; // Import the connectDB function from db.js
import User from "@/models/User"; // Import the User model


// Create a client to send and receive events
export const inngest = new Inngest({ id: "localcart-next" });

//Inngest function to  save user data to database

export const saveUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event,}) => {
    const {id,first_name,last_name,email_addresses,image_url    } = event.data; // Get the user data from the event data
    const userData = {
      _id: id,
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      image: image_url,
}
await connectDB()
await User.create(userData)

  } )

// Inngest function to update user data to database
export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event,}) => {
    const {id,first_name,last_name,email_addresses,image_url    } = event.data; // Get the user data from the event data
    const userData = {
      _id: id,
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      image: image_url,
    };
    await connectDB();
    await User.findByIdAndUpdate( id , userData)
  }
)

// Inngest function to delete user data from database
export const SyncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event,}) => {
    const {id} = event.data; // Get the user data from the event data
    await connectDB()
    await User.findByIdAndDelete(id)
  }
)
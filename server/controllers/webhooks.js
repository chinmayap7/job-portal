import { Webhook } from "svix";
import User from "../models/User.js";
import connectDB from "../config/db.js";

// api controller function to manage clerk user with DB
export const clerkWebhooks = async (req, res) => {
    try {
        await connectDB();
        const Whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // 1. FIXED: Verifying headers (Fixed the svix-timestamp key)
        await Whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"], // Changed from svix-signature
            "svix-signature": req.headers["svix-signature"]
        });

        // Getting data from req body
        const { data, type } = req.body;

        // switch case for diff events
        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    // 2. FIXED: Correct email path (singular email_address at the end)
                    email: data.email_addresses[0].email_address, 
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                };
                await User.create(userData);
                return res.json({ success: true }); // Added success: true
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address, // Fixed path here too
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                };
                await User.findByIdAndUpdate(data.id, userData);
                return res.json({ success: true });
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                return res.json({ success: true });
            }

            default:
                break;
        }

        res.json({ success: true });

    } catch (error) {
        // 3. FIXED: Improved error logging to see the REAL problem
        console.error("Webhook Error Details:", error.message);
        res.status(400).json({ success: false, message: error.message });
    }
}
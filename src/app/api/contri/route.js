import mongoose from "mongoose";
import { NextResponse } from "next/server";

// MongoDB Connection
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://yescitycompany:oXXCaD1Whc3mLUca@cluster0.k2m5o.mongodb.net/YesCity3");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// Contribution Schema
const contributionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  cityName: { type: String, required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  category: { type: String },
  title: { type: String, required: true },
  description: { type: String },
  images: [String],
  video: { type: String },
  submittedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'accepted', 'approved', 'rejected'], default: 'pending' },
  adminRemarks: { type: String },
});

const Contribution = mongoose.models.Contribution || mongoose.model("Contribution", contributionSchema);

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  profileImage: { 
    type: String, 
    default: 'https://i.pinimg.com/736x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg' 
  },
  firstProfile: { type: Boolean, default: false },
  phone: { type: String, required: true, unique: true },
  wishlist: [{
    cityName: { type: String, required: true },
    parentRef: { type: mongoose.Schema.Types.ObjectId, required: true },
    onModel: {
      type: String,
      required: true,
      enum: ['Accommodation', 'Activity', 'Food', 'HiddenGem', 'NearbySpot', 'Place', 'Shop'],
    },
  }],
  isPremium: { type: String, enum: ['FREE', 'A', 'B'], default: 'FREE' },
  premiumStartDate: { type: Date, default: Date.now },
  premiumExpiryDate: { type: Date, default: null },
  referralCode: { type: String, unique: true, sparse: true },
  referredBy: { type: String },
  contributionPoints: { type: Number, default: 0 },
  monthlyPoints: { type: Number, default: 0 },
  pointsMonth: { type: Date, default: Date.now },
  referralCount: { type: Number, default: 0 },
  signupDate: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now },
  resetToken: String,
  resetTokenExpiry: Date,
});

userSchema.index(
  { _id: 1, "wishlist.parentRef": 1, "wishlist.onModel": 1 },
  { unique: true, sparse: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

// GET Route - Fetch all pending contributions
export async function GET() {
  try {
    await connectDB();
    
    const pendingContributions = await Contribution.find({ status: 'pending' })
      .sort({ submittedAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      data: pendingContributions 
    });
  } catch (error) {
    console.error("Error fetching contributions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}

// POST Route - Update contribution status
export async function POST(request) {
  try {
    await connectDB();

    const { contributionId, status, adminRemarks, points = 0 } = await request.json();

    if (!contributionId || !status) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!['pending', 'accepted', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    // Update contribution status
    const updatedContribution = await Contribution.findByIdAndUpdate(
      contributionId,
      {
        status,
        adminRemarks: adminRemarks || "",
      },
      { new: true }
    );

    if (!updatedContribution) {
      return NextResponse.json(
        { success: false, error: "Contribution not found" },
        { status: 404 }
      );
    }

    // Update user points with monthly cap logic
    if ((status === 'accepted' || status === 'approved') && points > 0) {
      const user = await User.findById(updatedContribution.userId);

      if (user) {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const storedMonth = user.pointsMonth?.getMonth();
        const storedYear = user.pointsMonth?.getFullYear();

        // Reset monthly points if it's a new month
        if (storedMonth !== currentMonth || storedYear !== currentYear) {
          user.monthlyPoints = 0;
          user.pointsMonth = now;
        }

        let addedPoints = 0;
        if (user.monthlyPoints < 90) {
          const available = 90 - user.monthlyPoints;
          addedPoints = Math.min(points, available);

          user.monthlyPoints += addedPoints;
          user.contributionPoints += addedPoints;

          await user.save();
        }

        return NextResponse.json({
          success: true,
          data: updatedContribution,
          message:
            addedPoints > 0
              ? "Contribution status updated and points awarded"
              : "Contribution status updated, but monthly points limit reached",
          contributionPoints: user.contributionPoints,
          monthlyPoints: user.monthlyPoints,
          addedPoints,
        });
      }
    }

    // Case when no points need to be updated
    return NextResponse.json({
      success: true,
      data: updatedContribution,
      message: "Contribution status updated successfully",
    });
  } catch (error) {
    console.error("Error updating contribution:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update contribution" },
      { status: 500 }
    );
  }
};


// PUT Route - Update user contribution points directly
export async function PUT(request) {
  try {
    await connectDB();
    
    const { userId, points } = await request.json();
    
    if (!userId || points === undefined) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $inc: { 
          contributionPoints: points,
          monthlyPoints: points 
        }
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      data: {
        userId: updatedUser._id,
        contributionPoints: updatedUser.contributionPoints,
        monthlyPoints: updatedUser.monthlyPoints
      },
      message: "User points updated successfully"
    });
  } catch (error) {
    console.error("Error updating user points:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update user points" },
      { status: 500 }
    );
  }
}
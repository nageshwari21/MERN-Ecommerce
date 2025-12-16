import { Address } from "../Models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { fullName, address, city, state, country, pincode, phoneNumber } = req.body;

    if (!fullName || !address || !city || !state || !country || !pincode || !phoneNumber) {
      return res.status(400).json({ message: "All address fields are required" });
    }

    // ✅ Get logged-in user from middleware
    const userId = req.user._id;

    const userAddress = await Address.create({
      userId,
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    });

    res.status(200).json({ message: "Address added successfully ✅", userAddress });
  } catch (error) {
    console.error("Add address error:", error);
    res.status(500).json({ message: "Error adding address", error: error.message });
  }
};

export const getAddress=async (req,res)=>{
    let address =await Address({userId:req.user}).sort({createAt:-1})
    res.json({message:'address',userAddress:address[0]})
}
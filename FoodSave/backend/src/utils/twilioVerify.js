// utils/twilioVerify.js
export const verifyPhone = async (phone) => {
  await twilioClient.validationRequests.create({
    friendlyName: "FoodSave User",
    phoneNumber: phone,
  });
  // User receives verification code via SMS
};

// Add to user registration
if (userType === "ngo") {
  await verifyPhone(phone); // Force NGO phone verification
}

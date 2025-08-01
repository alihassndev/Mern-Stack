import { asyncHandler } from "../utils/asyncHandler.js";
import { FoodDonation } from "../model/foodDonation.model.js";
import { PickupRequest } from "../model/pickupRequest.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import PDFDocument from "pdfkit";

const getSystemStats = asyncHandler(async (req, res) => {
  const [donations, requests] = await Promise.all([
    FoodDonation.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    PickupRequest.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { donations, requests }, "System stats fetched")
    );
});

// Export stats as PDF
const exportStatsPDF = asyncHandler(async (req, res) => {
  const [donations, requests] = await Promise.all([
    FoodDonation.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    PickupRequest.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
  ]);
  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=system-stats.pdf");
  doc.pipe(res);
  doc.fontSize(18).text("System Stats Report", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text("Donations:");
  donations.forEach((d) => doc.text(`${d._id}: ${d.count}`));
  doc.moveDown();
  doc.fontSize(14).text("Pickup Requests:");
  requests.forEach((r) => doc.text(`${r._id}: ${r.count}`));
  doc.end();
});

// Export stats as CSV
const exportStatsCSV = asyncHandler(async (req, res) => {
  const [donations, requests] = await Promise.all([
    FoodDonation.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    PickupRequest.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
  ]);
  let csv = "Type,Status,Count\n";
  donations.forEach((d) => {
    csv += `Donation,${d._id},${d.count}\n`;
  });
  requests.forEach((r) => {
    csv += `PickupRequest,${r._id},${r.count}\n`;
  });
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=system-stats.csv");
  res.send(csv);
});

export { getSystemStats, exportStatsPDF, exportStatsCSV };

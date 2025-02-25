const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  _id: { type: String, required: true },
  itemName: { type: String, required: true },
  category: { type: String, enum: ['food', 'medical', 'stationery', 'other'], required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  minimumThreshold: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  supplier: { type: String, required: true },
  expiryDate: { type: Date },
  lastRestocked: { type: Date },
  lastRestockedBy: { type: String, ref: 'User' },
  alertTriggered: { type: Boolean, required: true },
  transactions: [{
    _id: { type: String, required: true },
    type: { type: String, enum: ['in', 'out'], required: true },
    quantity: { type: Number, required: true },
    transactionDate: { type: Date, required: true },
    transactedBy: { type: String, ref: 'User', required: true },
    purpose: { type: String },
    notes: { type: String },
    status: { type: String, required: true }
  }],
  notifications: [{
    _id: { type: String, required: true },
    type: { type: String, enum: ['stock', 'health', 'vaccination', 'general'], required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    recipients: [{ type: String, ref: 'User' }],
    isRead: { type: Boolean, required: true },
    createdAt: { type: Date, required: true },
    sourceType: { type: String, required: true },
    sourceId: { type: String, required: true },
    action: { type: String }
  }]
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;

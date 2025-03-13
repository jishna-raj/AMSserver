const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
  itemName: { type: String, required: true },
  category: { type: String, enum: ['food', 'medical', 'stationery', 'other'], required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  minimumThreshold: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  supplier: { type: String, required: true },
  expiryDate: { type: Date, required: true  }, // Optional
  lastRestocked: { type: Date, required: true  }, // Optional
  lastRestockedBy: { type: String, ref: 'User' , required: true  }, // Optional
  alertTriggered: { type: Boolean, required: true },
  transactions: [
    {
      type: { type: String, enum: ['in', 'out'], required: true },
      quantity: { type: Number, required: true },
      date: { type: Date, required: true }, // Updated field name
      by: { type: String, ref: 'User', required: true }, // Updated field name
    },
  ],
  
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
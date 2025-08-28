const inventories = require('../model/Inventorymodel')


exports.addInventoryController = async (req, res) => {
    try {
        // Extract the data from the request body
        const {
            itemName,
            category,
            quantity,
            unit,
            minimumThreshold,
            supplier,
            expiryDate,
            lastRestocked,
            lastRestockedBy,
            alertTriggered,
            transactions,
        } = req.body;

        // Validate required fields
        if (!itemName || !category || !quantity || !unit || !minimumThreshold || !supplier || alertTriggered === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Validate transactions if provided
        if (transactions && Array.isArray(transactions)) {
            for (const transaction of transactions) {
                if (!transaction.type || !transaction.quantity || !transaction.date || !transaction.by) {
                    return res.status(400).json({ message: 'Invalid transaction data. Missing required fields in transactions.' });
                }
                if (!['in', 'out'].includes(transaction.type)) {
                    return res.status(400).json({ message: 'Invalid transaction type. Must be "in" or "out".' });
                }
            }
        }

        // Check if an inventory item with the same properties (excluding quantity and transactions) already exists
        const existingInventory = await inventories.findOne({

            itemName,
            category,
            minimumThreshold,
            supplier,

        });

        if (existingInventory) {
            // If it exists, update the quantity and add the new transaction(s)
            existingInventory.quantity += quantity;
            

            if (transactions) {
                existingInventory.transactions.push(...transactions);
            }

            // Save the updated inventory item
            const updatedInventory = await existingInventory.save();

            // Respond with the updated inventory item
            return res.status(200).json(updatedInventory);
        } else {

            const newInventory = new inventories({

                itemName,
                category,
                quantity,
                unit,
                minimumThreshold,
                supplier,
                expiryDate,
                lastRestocked,
                lastRestockedBy,
                alertTriggered,
                transactions: transactions || [],
            });


            const savedInventory = await newInventory.save();


            return res.status(201).json(savedInventory);
        }
    } catch (error) {

        console.error('Error adding inventory:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}


exports.getAllInventoryController = async (req, res) => {
    try {
        // Fetch all inventory items from the database
        const allInventoryItems = await inventories.find({});

       /*  console.log(allInventoryItems); */
        

        // If no items are found, return a 404 response
        if (!allInventoryItems || allInventoryItems.length === 0) {
            return res.status(404).json({ message: 'No inventory items found' });
        }

        // Send the inventory items as a response
        res.status(200).json(allInventoryItems);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error fetching inventory items:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.updateInventoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Debug: Log the incoming request body
        console.log('Incoming request body:', req.body);

        // Convert date strings to Date objects
        if (updates.expiryDate) {
            updates.expiryDate = new Date(updates.expiryDate);
        }
        if (updates.lastRestocked) {
            updates.lastRestocked = new Date(updates.lastRestocked);
        }

        // Handle transactions if provided
        if (updates.transactions && Array.isArray(updates.transactions)) {
            // Debug: Log the transactions being processed
            console.log('Transactions to be added:', updates.transactions);

            // Validate each transaction
            for (const transaction of updates.transactions) {
                if (!transaction.type || !transaction.quantity || !transaction.date || !transaction.by) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid transaction data. Missing required fields in transactions.'
                    });
                }
                if (!['in', 'out'].includes(transaction.type)) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid transaction type. Must be "in" or "out".'
                    });
                }

                // Convert transaction date to a Date object
                transaction.date = new Date(transaction.date);
            }

            // Overwrite the transactions array with the new transactions
            updates.transactions = updates.transactions; // Replace the entire array
        }

        // Debug: Log the updates object after processing transactions
        console.log('Updates object after processing transactions:', updates);

        // Update the inventory item
        const updatedItem = await inventories.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({
                success: false,
                message: 'Item not found'
            });
        }

        // Debug: Log the updated item
        console.log('Updated item:', updatedItem);

        res.status(200).json({
            success: true,
            data: updatedItem
        });

    } catch (error) {
        console.error('Update error:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};



exports.deleteInventoryController = async (req, res) => {
    console.log("Inside deleteInventoryController");

    const { id } = req.params; // Extract the item ID from the URL

    console.log("Deleting item with ID:", id);

    try {
        // Delete the item from the database
        const deletedItem = await inventories.findByIdAndDelete(id);

        // If the item does not exist, return a 404 error
        if (!deletedItem) {
            return res.status(404).json({
                success: false,
                message: "Item not found."
            });
        }

        // Return a success response
        return res.status(200).json({
            success: true,
            message: "Item deleted successfully.",
            deletedItem
        });
    } catch (error) {
        console.error("Error deleting item:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the item."
        });
    }
};


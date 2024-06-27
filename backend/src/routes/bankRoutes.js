const express = require('express');
const router = express.Router();
const BankModel = require('../models/bank.model');
const verifyToken = require('../middleware/authMiddleware');

router.get("/bank", async (req, res) => {
    try {
        const { limit = 10, orderBy = "createdAt", sortBy = "desc", name } = req.query;
        let currentPage = +req.query.currentPage || 1;

        const skip = (currentPage - 1) * +limit;

        const query = {};

        if (name) query.name = { $regex: name, $options: "i" };

        const data = await BankModel.find(query)
            .skip(skip)
            .limit(+limit)
            .sort({ [orderBy]: sortBy });
        const totalItems = await BankModel.countDocuments(query);

        return res.status(200).json({
            code: 200,
            message: "Successfully get all bank data!",
            data,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            limit: +limit,
            currentPage: currentPage,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

router.get("/bank/:id", async (req, res) => {
    try {
        const data = await BankModel.findById(req.params.id);

        if (data) {
            return res.status(200).json({
                code: 200,
                message: `Successfully get bank data with ID: ${req.params.id}!`,
                data,
            });
        }

        return res.status(404).json({
            message: "Not Found",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

router.post("/bank", async (req, res) => {
    try {
        const { name, branch, accountNumber, balance } = req.body;
        const bank = new BankModel({
            name,
            branch,
            accountNumber,
            balance
        });
        const data = await bank.save();
        return res.status(201).json({
            code: 201,
            message: "Successfully created bank data!",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

router.patch("/bank/:id", verifyToken, async (req, res) => {
    try {
        const { name, branch, accountNumber, balance } = req.body;
        const { id } = req.params;

        const data = await BankModel.findByIdAndUpdate(
            id,
            {
                name,
                branch,
                accountNumber,
                balance
            },
            { new: true }
        );
        return res.status(200).json({
            code: 200,
            message: "Successfully updated bank data!",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

router.delete("/bank/:id", verifyToken, async (req, res) => {
    try {
        const data = await BankModel.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({
                code: 404,
                message: "Bank data not found!",
            });
        }
        return res.status(200).json({
            code: 200,
            message: "Successfully deleted bank data!",
            deletedData: data,
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            message: "Internal server error",
            error: error.message,
        });
    }
});

module.exports = router;

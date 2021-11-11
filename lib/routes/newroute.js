"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const dbpath = path_1.default.join(__filename, "../../db.json");
const getDB = () => {
    console.log(dbpath);
    if (!fs_1.default.existsSync(dbpath)) {
        fs_1.default.writeFileSync(dbpath, JSON.stringify([]));
    }
    return JSON.parse(fs_1.default.readFileSync(dbpath, "utf-8"));
};
// const info = getDB()
router.get("/", function (req, res) {
    const info = getDB();
    info.sort((a, b) => a.id - b.id);
    //console.log(info);
    res.status(200).json(info);
});
router.get("/:id", function (req, res) {
    const info = getDB();
    const company = info.find((c) => c.id === parseInt(req.params.id));
    if (!company)
        return res.status(404).send("The company with the given id was not found");
    res.send(company);
});
router.post("/", function (req, res) {
    const info = getDB();
    if (!req.body.organization) {
        return res.status(400).send("Organisation Name is required");
    }
    const data = {
        id: info.length + 1,
        organization: req.body.organization,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        products: req.body.products,
        marketValue: req.body.marketValue,
        address: req.body.address,
        ceo: req.body.ceo,
        country: req.body.country,
        noOfEmployees: req.body.noOfEmployees,
        employees: req.body.employees,
    };
    info.push(data);
    console.log(dbpath);
    fs_1.default.writeFileSync(dbpath, JSON.stringify(info, null, " "));
    res.status(201).send(data);
});
router.put("/:id", function (req, res) {
    const info = getDB();
    const undateInfo = info.find((c) => c.id === parseInt(req.params.id));
    if (!undateInfo)
        return res.status(404).send("The company with the given id was not found");
    (undateInfo.organization =
        req.body.organization || undateInfo.organization),
        (undateInfo.updatedAt = new Date().toISOString()),
        (undateInfo.products = req.body.products || undateInfo.products),
        (undateInfo.marketValue = req.body.marketValue || undateInfo.marketValue),
        (undateInfo.address = req.body.address || undateInfo.address),
        (undateInfo.ceo = req.body.ceo || undateInfo.ceo),
        (undateInfo.country = req.body.country || undateInfo.country),
        (undateInfo.noOfEmployees = req.body.noOfEmployees || undateInfo.noOfEmployees),
        (undateInfo.employees = req.body.employees || undateInfo.employees);
    info.push(undateInfo);
    fs_1.default.writeFileSync(dbpath, JSON.stringify(info, null, " "));
    res.status(201).json(undateInfo);
});
router.delete("/:id", function (req, res) {
    const info = getDB();
    const deleteInfo = info.find((c) => c.id === parseInt(req.params.id));
    if (!deleteInfo) {
        return res.status(404).send("The company with the given id was not found");
    }
    const index = info.findIndex((c) => c.id === parseInt(req.params.id));
    info.splice(index, 1);
    fs_1.default.writeFileSync(dbpath, JSON.stringify(info, null, " "));
    res.send(deleteInfo);
});
exports.default = router;

import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const dbpath = path.join(__filename,"../../db.json")
const getDB =  ()=> {
  if( !fs.existsSync(dbpath) ){
    fs.writeFileSync(dbpath, JSON.stringify([]) )
  }
 return JSON.parse( fs.readFileSync(dbpath, "utf-8"))
}

// const info = getDB()

router.get("/", function (req, res) {
  const info = getDB()
  info.sort((a: { id: number }, b: { id: number }) => a.id - b.id);
  //console.log(info);
  res.status(200).json(info);
});

router.get("/:id", function (req, res) {
  const info = getDB()
  const company = info.find(
    (c: { id: number }) => c.id === parseInt(req.params.id)
  );
  if (!company)
    return res.status(404).send("The company with the given id was not found");
  res.send(company);
});

router.post("/", function (req, res) {
  const info = getDB()
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
  fs.writeFileSync(dbpath, JSON.stringify(info, null, " "));
  res.status(201).send(data);
});

router.put("/:id", function (req, res) {
  const info = getDB()
  const undateInfo = info.find(
    (c: { id: number }) => c.id === parseInt(req.params.id)
  );
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
  fs.writeFileSync(dbpath, JSON.stringify(info, null, " ") );
  res.status(201).json(undateInfo);
});

router.delete("/:id", function (req, res) {
  const info = getDB()
  const deleteInfo = info.find(
    (c: { id: number }) => c.id === parseInt(req.params.id)
  );
  if (!deleteInfo){
    return res.status(404).send("The company with the given id was not found");
  }
  const index = info.findIndex(
    (c: { id: number }) => c.id === parseInt(req.params.id)
  );
  info.splice(index, 1);
  fs.writeFileSync(dbpath, JSON.stringify(info, null, " ") );
  res.send(deleteInfo);
});

export default router;

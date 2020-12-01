const ExcelJs = require("exceljs");
const excelToJson = require("convert-excel-to-json");
const dummyUser = require("../../dummyUser");

const mainController = {
  // to print primes
  primes: (req, res) => {
    const { num } = req.query;
    let primesArr = [];
    for (let i = Number(num)+1; i > num; i++) {
      let count = 0;
      for (let j = 2; j < i; j++) {
        if (i % j === 0) {
          count = 1;
          break;
        }
      }
      if (primesArr.length < 20) {
        if (count === 0) {
          primesArr.push(i);
        }
      } else if (primesArr.length === 20) {
        break;
      }
    }
    res.json(primesArr);
  },
  // export to excel file
  insertToExcel: async (req, res) => {
    const { id, email, firstName, lastName, avatar } = req.query;
    const user = {
      Id: Number(id),
      Email: email,
      FirstName: firstName,
      LastName: lastName,
      Avatar: avatar,
    };
    const newData = dummyUser.concat(user);
    try {
      const workBook = new ExcelJs.Workbook();
      const worksheet = workBook.addWorksheet("data-employee");
      worksheet.columns = [
        { header: "Id", key: "Id", width: 20 },
        { header: "Email", key: "Email", width: 20 },
        { header: "FirstName", key: "FirstName", width: 20 },
        { header: "LastName", key: "LastName", width: 20 },
        { header: "Avatar", key: "Avatar", width: 60 },
      ];

      newData.map((item) => {
        return worksheet.addRow(item);
      });

      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });

      await workBook.xlsx.writeFile("users.xlsx");
      res.send("sukses");
    } catch (e) {
      res.send(`error: ${e}`);
    }
  },
  // read from excel file
  readExcel: (_, res) => {
    const result = excelToJson({
      sourceFile: "users.xlsx",
      columnToKey: {
        A: "Id",
        B: "Email",
        C: "FirstName",
        D: "LastName",
        E: "Avatar",
      },
    });
    res.send(result);
  },
};

module.exports = mainController;

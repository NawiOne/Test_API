const ExcelJs = require("exceljs");
const excelToJson = require("convert-excel-to-json");
const dummyUser = require("../../dummyUser");

const mainController = {
  primes: (req, res) => {
    const { num } = req.query;
    let primesArr = [];
    let max = num + 100;
    for (let i = Number(num) + 1; i <= max; i++) {
      let count = 0;
      for (let j = 2; j < i; j++) {
        if (i % j === 0) {
          count = 1;
          break;
        }
      }
      if (i > 1 && count === 0) {
        primesArr.push(i);
      }
    }
    res.json(primesArr.slice(0, 20));
  },

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
      res.send("error");
    }
  },

  readExcel: (_, res) => {
    const result = excelToJson({
      sourceFile: "users.xlsx",
    });
    res.send(result);
  },
};

module.exports = mainController;

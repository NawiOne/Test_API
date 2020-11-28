const ExcelJs = require("exceljs");
const dummyUser = require("../../dummyUser");
const excelToJson = require("convert-excel-to-json");

const mainController = {
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

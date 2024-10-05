const fs = require("fs");
const https = require("follow-redirects").https;

// Download file via JS
const url = `https://dlm.mariadb.com/MariaDB/mariadb-11.4.3/winx64-packages/mariadb-11.4.3-winx64.msi`;
const file = fs.createWriteStream("mariab.msi");
const options = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0",
  },
};

https
  .get(url, options, function (response) {
    console.log("status code:", response.statusCode);
    response.pipe(file);
    file.on("finish", () => {
      file.close(() => {
        console.log("File downloaded successfully");
      });
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });

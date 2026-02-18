import fs from "fs";

async function cleanFile(path) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      return err;
    } else {
      const clean = data.trim();
      fs.writeFile(path, clean , (err)=>{
        if(err)console.log("something went wrong" , err)
            
      });
    }
  });
}

async function main() {
  await cleanFile("./file.txt");
  console.log("your file is cleaned")
}

main();

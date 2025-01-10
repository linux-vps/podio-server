import { config } from 'dotenv';
import { Podio } from "./";
import fs from "fs";

config();

const pd = new Podio({
  clientId: <string>process.env.PODIO_CLIENT_ID,
  clientSecret: <string>process.env.PODIO_CLIENT_SECRET,
  username: <string>process.env.PODIO_USER,
  password: <string>process.env.PODIO_PASSWORD
}, "./podio_token.json");

async function Main(): Promise<void> {
  // // Lấy tất cả items
  // const all_items = await pd.Items.FilterItems(30095263);
  // console.log("\n\nall items", all_items);

  // Lấy một item cụ thể
  const one_item = await pd.Items.GetItemByAppItemId(30095263, 2);
  console.log("\n\none item", one_item);
  fs.writeFileSync("./item.json", JSON.stringify(one_item, null, 2));

  // // Tạo item mới
  // const newItem = {
  //   external_id: "bug-test-003",
  //   fields: [
  //     {
  //       external_id: "title",
  //       values: [{ value: "Test Bug Report" }]
  //     },
  //     {
  //       external_id: "description-of-problem",
  //       values: [{ value: "Đây là mô tả về vấn đề của bug" }]
  //     },
  //     {
  //       external_id: "steps-to-reproduce",
  //       values: [{ value: "1. Bước 1\n2. Bước 2\n3. Bước 3" }]
  //     },
  //     {
  //       external_id: "type-2",
  //       values: [{ value: 1 }]  // Giả sử 1 là ID của loại bug
  //     },
  //     {
  //       external_id: "status-2",
  //       values: [{ value: 1 }]  // Giả sử 1 là ID của trạng thái "New"
  //     },
  //     {
  //       external_id: "priority-2",
  //       values: [{ value: 2 }]  // Giả sử 2 là ID của mức độ ưu tiên "Medium"
  //     }
  //   ],
  //   tags: ["test", "sample"]
  // };

  // const created_item = await pd.Items.addItem(30095263, newItem);
  // console.log("\n\nCreated item:", created_item);
}

Main();
